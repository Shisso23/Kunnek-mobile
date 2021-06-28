import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import _ from 'lodash';
import PeachMobile from 'react-native-peach-mobile';

import {
  createUserCreditCardAction,
  submitCardTransactionAction,
} from '../../../reducers/user-reducer/user-cards.actions';
import { createCheckoutIdAction } from '../../../reducers/user-reducer/user-cards.actions';
import Index from '../../../components/atoms/title';
import { FormScreenContainer } from '../../../components';
import CreditCardForm from '../../../components/forms/credit-card/credit-card.form';
import { userCreditCardModel } from '../../../models/app/user/user-credit-card.model';
import config from '../../../config';
import { StyleSheet } from 'react-native';

const AddCardScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [creditCardForm, setCreditCardForm] = useState({});
  const [checkoutID, setCheckoutID] = useState({});
  const peachMobileRef = useRef(null);

  useEffect(() => {
    dispatch(createCheckoutIdAction())
      .then((id) => {
        console.log('create token', id);
        setCheckoutID(`${id}`);
        return id;
      })
      .catch((error) => console.log('error', { error }));
  }, []);

  const _onSubmit = (cardFormValues) => {
    if (peachMobileRef) {
      setCreditCardForm(cardFormValues);
      return PeachMobile.createTransaction(
        checkoutID,
        null,
        _.get(cardFormValues, 'cardHolder'),
        _.get(cardFormValues, 'cardNumber'),
        _.get(cardFormValues, 'expiryDate').slice(0, 2),
        `20${_.get(creditCardForm, 'expiryDate', '').slice(3)}`,
        _.get(cardFormValues, 'cvv'),
      )
        .then(async (transaction) => {
          console.log('Transaction', { transaction });
          await PeachMobile.submitTransaction(transaction)
            .then(async () => {
              console.log('submitted transaction! Peach Mobile');
              await dispatch(submitCardTransactionAction(checkoutID))
                .then(() => {
                  console.log('submitted transaction! Action');
                  const finalData = {
                    cardNumber: `************${_.get(cardFormValues, 'cardNumber').slice(
                      _.get(cardFormValues, 'cardNumber').length - 4,
                    )}`,
                    cardType: _.get(cardFormValues, 'cardType'),
                    cardHolder: _.get(cardFormValues, 'cardHolder'),
                    expiryMonth: _.get(cardFormValues, 'expiryDate').slice(0, 2),
                    expiryYear: _.get(cardFormValues, 'expiryDate').slice(3),
                    senderId: [],
                  };
                  return dispatch(createUserCreditCardAction(finalData))
                    .then(() => {
                      console.log('create user card success');
                      navigation.goBack();
                    })
                    .catch((error) => console.log('error creating card', { error }));
                })
                .catch((error) => {
                  console.log('error message1: ' + error.message);
                  return error;
                });
            })
            .catch((error) => {
              console.log('error message2: ' + error);
            });
        })
        .catch((error) => console.log('create transaction error', { error }));
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
          onSuccess={() => {}}
        />
      </FormScreenContainer>
      <PeachMobile
        mode={config.peachPayments.peachPaymentMode}
        urlScheme="com.kunnek.payments"
        cardHolder={_.get(creditCardForm, 'cardHolder')}
        cardNumber={_.get(creditCardForm, 'cardNumber')}
        cardExpiryYear={`20${_.get(creditCardForm, 'expiryDate', '').slice(3)}`}
        cardExpiryMonth={_.get(creditCardForm, 'expiryDate', '').slice(0, 2)}
        cardCVV={_.get(creditCardForm, 'cvv')}
        checkoutID={checkoutID}
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
