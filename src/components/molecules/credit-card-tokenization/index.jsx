import config from '../../../config';
import PeachMobile from 'react-native-peach-mobile';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  createCheckoutIdAction,
  createUserCreditCardAction,
  getCardRegistrationStatusAction,
  updateUserCreditCardAction,
} from '../../../reducers/user-reducer/user-cards.actions';
import { getCurrency } from '../../../helpers/payment.helper';
import { PAYMENT_TYPES } from '../../../services/sub-services/payment-service/payment.service';
import { flashService } from '../../../services';
import { successful } from '../../../helpers/errors.helper';
import { useNavigation } from '@react-navigation/native';
import { tokenizeCardModel } from '../../../models/app/credit-card/tokenize-card.model';

const CreditCardTokenization = ({ sceneToNavigateToOnSuccess, saveMethod }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const peachMobileRef = useRef(null);
  const senderId = useSelector((state) => state.userReducer.senderId);
  const [checkoutID, setCheckoutID] = useState('');

  useEffect(() => {
    dispatch(createCheckoutIdAction()).then((id) => {
      setCheckoutID(id);
    });
  }, []);

  const _createTransaction = (cardModel) => {
    return PeachMobile.createTransaction(
      checkoutID,
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
    return dispatch(getCardRegistrationStatusAction(checkoutID)).then((cardRegStatus) =>
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
    const method =
      saveMethod === 'create' ? createUserCreditCardAction : updateUserCreditCardAction;
    return dispatch(method(finalData))
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
      sceneToNavigateTo: sceneToNavigateToOnSuccess,
    });
  };

  const process = (cardFormValues) => {
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

  return (
    <>
      <PeachMobile
        mode={config.peachPayments.peachPaymentMode}
        urlScheme={config.peachPayments.urlScheme}
        ref={peachMobileRef}
      />
    </>
  );
};

export default CreditCardTokenization;

CreditCardTokenization.propTypes = {
  sceneToNavigateToOnSuccess: PropTypes.string,
  saveMethod: PropTypes.string,
};

CreditCardTokenization.defaultProps = {
  sceneToNavigateToOnSuccess: 'TransactionDetails',
  saveMethod: 'create',
};
