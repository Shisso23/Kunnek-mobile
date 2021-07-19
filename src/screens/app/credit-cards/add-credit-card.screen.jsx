import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';

import Index from '../../../components/atoms/title';
import { FormScreenContainer } from '../../../components';
import CreditCardForm from '../../../components/forms/credit-card/credit-card.form';
import { userCreditCardModel } from '../../../models/app/user/user-credit-card.model';
import PeachMobile from 'react-native-peach-mobile';
import _ from 'lodash';
import config from '../../../config';
import {
  createCheckoutIdAction,
  createUserCreditCardAction,
  getCardRegistrationStatusAction,
} from '../../../reducers/user-reducer/user-cards.actions';
import { flashService } from '../../../services';
import { successful } from '../../../helpers/errors.helper';
import { getCurrency } from '../../../helpers/payment.helper';
import { PAYMENT_TYPES } from '../../../services/sub-services/payment-service/payment.service';
import { tokenizeCardModel } from '../../../models/app/credit-card/tokenize-card.model';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const AddCreditCardScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
    return dispatch(createUserCreditCardAction(finalData))
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

  return (
    <>
      <FormScreenContainer contentContainerStyle={styles.formContainer}>
        <Index title="My Debit/Credit Card" />
        <Divider />
        <CreditCardForm
          initialValues={userCreditCardModel({})}
          submitForm={_onSubmit}
          submitButtonStyle={styles.submitButtonStyle}
        />
      </FormScreenContainer>
      {_renderPeachPayments()}
    </>
  );
};

export default AddCreditCardScreen;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  submitButtonStyle: {
    alignSelf: 'center',
    bottom: 0,
    position: 'absolute',
    width: '95%',
  },
});
