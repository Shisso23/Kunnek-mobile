import _ from 'lodash';

import { creditCardService, flashService } from '../../services';
import {
  setCreditCardsLoadingAction,
  setUserCreditCardsAction,
  setSubmitCardTransactionLoadingAction,
  setCardCheckoutIdAction,
} from './user.reducer';

export const createCheckoutIdAction = () => async (dispatch) => {
  return creditCardService
    .createCheckoutId()
    .then((response) => {
      const checkoutId = _.get(response, 'id');
      dispatch(setCardCheckoutIdAction(checkoutId));
      return checkoutId;
    })
    .catch((error) => flashService.error(error.message));
};

export const getUserCreditCardsAction = () => async (dispatch) => {
  dispatch(setCreditCardsLoadingAction(true));
  try {
    const cards = await creditCardService.getCreditCards();
    dispatch(setUserCreditCardsAction(cards));
  } catch (error) {
    flashService.error('Could not load credit cards');
    console.warn(error.message);
  } finally {
    dispatch(setCreditCardsLoadingAction(false));
  }
};

export const createUserCreditCardAction = (data) => async (dispatch, getState) => {
  dispatch(setCreditCardsLoadingAction(true));
  try {
    const { creditCards } = getState().userReducer;
    const card = await creditCardService.createCreditCard(data);
    dispatch(setCreditCardsLoadingAction(false));
    dispatch(setUserCreditCardsAction([...creditCards, card]));
    return card;
  } catch (error) {
    console.log('error creating card', { error });
    flashService.error('Could not create a credit card');
    console.warn(error.message);
    return error;
  }
};

export const submitCardTransactionAction = (checkoutID) => async (dispatch) => {
  dispatch(setSubmitCardTransactionLoadingAction(true));
  await creditCardService.submitCardTransaction(checkoutID);
  dispatch(setSubmitCardTransactionLoadingAction(false));
};

export const tokenizeCard = (data) => (dispatch) => {
  dispatch(setCreditCardsLoadingAction(true));
  return creditCardService
    .tokenizeCard(new URLSearchParams(data).toString())
    .then((response) => response)
    .catch((error) => {
      flashService.error('Could not tokenize your credit card.');
      console.warn(error.message);
    })
    .finally(() => dispatch(setCreditCardsLoadingAction(false)));
};
