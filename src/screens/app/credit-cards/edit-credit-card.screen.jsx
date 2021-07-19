import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { FormScreenContainer } from '../../../components';
import Index from '../../../components/atoms/title';
import { useTheme } from '../../../theme';
import {
  createCheckoutIdAction,
  deleteUserCreditCardAction,
  getCardRegistrationStatusAction,
  updateUserCreditCardAction,
} from '../../../reducers/user-reducer/user-cards.actions';
import CreditCardForm from '../../../components/forms/credit-card/credit-card.form';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme/Variables';
import PeachMobile from 'react-native-peach-mobile';
import config from '../../../config';
import { flashService } from '../../../services';
import { successful } from '../../../helpers/errors.helper';
import { getCurrency } from '../../../helpers/payment.helper';
import { PAYMENT_TYPES } from '../../../services/sub-services/payment-service/payment.service';
import { tokenizeCardModel } from '../../../models/app/credit-card/tokenize-card.model';

const ViewCreditCardScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { card } = route.params;
  const peachMobileRef = useRef(null);
  const senderId = useSelector((state) => state.userReducer.senderId);
  const [checkoutId, setCheckoutId] = useState('');

  useEffect(() => {
    dispatch(createCheckoutIdAction()).then((id) => {
      setCheckoutId(id);
    });
  }, []);

  const _createTransaction = (cardModel) => {
    return PeachMobile.createTransaction(
      checkoutId,
      '',
      _.get(cardModel, 'cardHolder'),
      _.get(cardModel, 'cardNumber'),
      _.get(cardModel, 'expiryMonth'),
      _.get(cardModel, 'expiryYear', ''),
      _.get(cardModel, 'cvv'),
    );
  };

  const _submitRegistration = (cardModel, transaction) => {
    return PeachMobile.submitRegistration(
      transaction,
      `${config.peachPayments.peachPaymentMode}`,
    ).catch((error) => console.warn('peach submit registration error', error.message));
  };

  const _getCardRegistrationStatus = () => {
    return dispatch(getCardRegistrationStatusAction(checkoutId)).then((cardRegStatus) =>
      _.get(cardRegStatus, 'id', ''),
    );
  };

  const _saveCreditCard = (cardModel, tokenizedCard) => {
    const finalData = {
      cardNumber: _.get(cardModel, 'obfuscatedCardNumber'),
      cardType: _.get(cardModel, 'paymentBrand'),
      cardHolder: _.get(cardModel, 'cardHolder'),
      expiryMonth: _.get(cardModel, 'expiryMonth'),
      expiryYear: _.get(cardModel, 'expiryYear'),
      senderId,
      tokenizedCard,
    };
    return dispatch(updateUserCreditCardAction(finalData))
      .then((creditCardResponse) => {
        flashService.success('Added card successfully!');
        if (successful(creditCardResponse)) {
          _openVerificationPaymentScreen(creditCardResponse);
        }
      })
      .catch((error) => {
        flashService.error('Could not create card', error.message);
      });
  };

  const _openVerificationPaymentScreen = (card) => {
    navigation.navigate('Payment', {
      message: `We will make a charge of ${getCurrency()}1.00 on your credit card to verify that your card number and details are correct. This charge will be reversed once successful.`,
      totalAmount: 1,
      paymentType: PAYMENT_TYPES.verification,
      card,
      sceneToNavigateTo: 'TransactionDetails',
    });
  };

  const _process = (cardFormValues) => {
    const cardModel = tokenizeCardModel(cardFormValues);
    return _createTransaction(cardModel)
      .then((transaction) => _submitRegistration(cardModel, transaction))
      .then(_getCardRegistrationStatus)
      .then((tokenizedCard) => _saveCreditCard(cardModel, tokenizedCard))
      .catch((error) => {
        console.warn({ error });
        flashService.error(error.message);
      });
  };

  const _renderPeachPayments = () => (
    <>
      <PeachMobile
        mode={config.peachPayments.peachPaymentMode}
        urlScheme={config.peachPayments.urlScheme}
        ref={peachMobileRef}
      />
    </>
  );

  const _onSubmit = async (cardFormValues) => {
    return _process(cardFormValues);
  };

  const _delete = () => {
    dispatch(deleteUserCreditCardAction(_.get(card, 'id', '')));
  };

  const _formSuccess = () => {
    navigation.goBack();
  };

  const { Gutters, Layout } = useTheme();

  return (
    <FormScreenContainer contentContainerStyle={Layout.fill}>
      <Index title="My Debit/Credit Card" />
      <Divider />
      <View style={Gutters.smallHMargin}>
        <CreditCardForm
          submitForm={_onSubmit}
          onSuccess={_formSuccess}
          initialValues={card}
          containerStyle={Gutters.smallHMargin}
          submitText="Update Card"
          disabled={true}
        />
      </View>
      <View style={Layout.fill} />
      <SafeAreaView>
        <Button
          onPress={_delete}
          title={'Delete'}
          containerStyle={styles.buttonStyle}
          buttonStyle={styles.clearButtonStyle}
          titleStyle={[styles.clearButtonTextStyle]}
        />
      </SafeAreaView>
      {_renderPeachPayments()}
    </FormScreenContainer>
  );
};

ViewCreditCardScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default ViewCreditCardScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: 'center',
    width: '90%',
  },
  clearButtonStyle: {
    backgroundColor: Colors.transparent,
  },
  clearButtonTextStyle: {
    color: Colors.darkerGrey,
  },
});
