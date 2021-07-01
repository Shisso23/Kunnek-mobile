import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import _ from 'lodash';
import PeachMobile from 'react-native-peach-mobile';

import {
  createUserCreditCardAction,
  submitCardTransactionAction,
} from '../../../reducers/user-reducer/user-cards.actions';
import { tokenizeCardModel } from '../../../models/app/credit-card/tokenize-card.model';
import { successful } from '../../../helpers/errors.helper';
import { createCheckoutIdAction } from '../../../reducers/user-reducer/user-cards.actions';
import Index from '../../../components/atoms/title';
import { FormScreenContainer } from '../../../components';
import CreditCardForm from '../../../components/forms/credit-card/credit-card.form';
import { userCreditCardModel } from '../../../models/app/user/user-credit-card.model';
import config from '../../../config';
import { StyleSheet } from 'react-native';
import { PAYMENT_TYPES } from '../../../services/sub-services/payment-service/payment.service';
import { getCurrency } from '../../../helpers/payment.helper';
import { flashService } from '../../../services';

const AddCardScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const senderId = useSelector((state) => state.userReducer.senderId);
  const [creditCardForm, setCreditCardForm] = useState({});
  const [checkoutID, setCheckoutID] = useState('');
  const peachMobileRef = useRef(null);

  useEffect(() => {
    dispatch(createCheckoutIdAction()).then((id) => {
      setCheckoutID(id);
    });
  }, []);

  const _openVerificationPaymentScreen = (card) => {
    navigation.navigate('Payment', {
      message: `We will make a charge of ${getCurrency()}1.00 on your credit card to verify that your card number and details are correct. This charge will be reversed once successful.`,
      totalAmount: 1,
      paymentType: PAYMENT_TYPES.verification,
      card,
    });
  };

  const _onSubmit = async (cardFormValues) => {
    if (peachMobileRef) {
      setCreditCardForm(cardFormValues);
      const cardModel = tokenizeCardModel(cardFormValues);

      return PeachMobile.createTransaction(
        checkoutID,
        _.get(cardModel, 'paymentBrand'),
        _.get(cardModel, 'cardHolder'),
        _.get(cardModel, 'cardNumber'),
        _.get(cardModel, 'expiryMonth'),
        _.get(cardModel, 'expiryYear', ''),
        _.get(cardModel, 'cvv'),
      )
        .then((transaction) => {
          return PeachMobile.submitRegistration(
            transaction,
            config.peachPayments.peachPaymentMode,
          ).then(() => {
            return dispatch(submitCardTransactionAction(checkoutID))
              .then(() => {
                const finalData = {
                  cardNumber: _.get(cardModel, 'obfuscatedCardNumber'),
                  cardType: _.get(cardModel, 'paymentBrand'),
                  cardHolder: _.get(cardModel, 'cardHolder'),
                  expiryMonth: _.get(cardModel, 'expiryMonth'),
                  expiryYear: _.get(cardModel, 'expiryYear'),
                  senderId,
                };
                return dispatch(createUserCreditCardAction(finalData))
                  .then((creditCardResponse) => {
                    flashService.success('added card successfully!');
                    if (successful(creditCardResponse)) {
                      _openVerificationPaymentScreen(creditCardResponse);
                    }
                  })
                  .catch(() => flashService.error('Could not create card'));
              })
              .catch((error) => {
                return error;
              });
          });
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  };

  return (
    <>
      <FormScreenContainer contentContainerStyle={styles.formContainer}>
        <Index title="My Debit/Credit Card" />
        <Divider />
        <CreditCardForm
          initialValues={userCreditCardModel(creditCardForm)}
          submitForm={_onSubmit}
        />
      </FormScreenContainer>
      <PeachMobile
        mode={config.peachPayments.peachPaymentMode}
        urlScheme="com.kunnek.payments"
        ref={peachMobileRef}
      />
    </>
  );
};

export default AddCardScreen;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
});
