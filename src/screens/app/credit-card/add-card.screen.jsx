import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import _ from 'lodash';
import PeachMobile from 'react-native-peach-mobile';

import {
  createUserCreditCardAction,
  submitCardTransactionAction,
  tokenizeCard,
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
      const tokenizedCard = await dispatch(
        tokenizeCard({
          entityId: _.get(cardModel, 'entityId', ''),
          paymentBrand: _.get(cardModel, 'paymentBrand'),
          'card.holder': _.get(cardModel, 'card.holder'),
          'card.number': _.get(cardModel, 'card.number'),
          'card.expiryMonth': _.get(cardModel, 'card.expiryMonth'),
          'card.expiryYear': _.get(cardModel, 'card.expiryYear', ''),
          'card.cvv': _.get(cardModel, 'card.cvv'),
        }),
      );

      return PeachMobile.createTransaction(
        checkoutID,
        _.get(cardModel, 'paymentBrand'),
        _.get(cardModel, 'card.holder'),
        _.get(cardModel, 'card.number'),
        _.get(cardModel, 'card.expiryMonth'),
        _.get(cardModel, 'card.expiryYear', ''),
        _.get(cardModel, 'card.cvv'),
      )
        .then(async (transaction) => {
          return await PeachMobile.submitTransaction(transaction).then(async () => {
            return await dispatch(submitCardTransactionAction(checkoutID))
              .then(() => {
                const finalData = {
                  cardNumber: _.get(cardModel, 'obfuscatedCardNumber'),
                  cardType: _.get(cardModel, 'paymentBrand'),
                  cardHolder: _.get(cardModel, 'card.holder'),
                  expiryMonth: _.get(cardModel, 'card.expiryMonth'),
                  expiryYear: _.get(cardModel, 'card.expiryYear'),
                  senderId,
                  tokenizedCard: _.get(tokenizedCard, 'data.id', ''),
                };
                return dispatch(createUserCreditCardAction(finalData))
                  .then((creditCardResponse) => {
                    console.warn({ creditCardResponse });
                    if (successful(creditCardResponse)) {
                      _openVerificationPaymentScreen(creditCardResponse);
                    }
                    return creditCardResponse;
                  })
                  .catch((error) => console.warn('Create card error', { error }));
              })
              .catch((error) => {
                return error;
              });
          });
        })
        .catch(() => flashService.error('Could not add card!'));
    }
  };

  const onSuccess = () => {
    flashService.success('added card successfully!');
  };

  return (
    <>
      <FormScreenContainer contentContainerStyle={styles.formContainer}>
        <Index title="My Debit/Credit Card" />
        <Divider />
        <CreditCardForm
          initialValues={userCreditCardModel(creditCardForm)}
          submitForm={_onSubmit}
          onSuccess={onSuccess}
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
