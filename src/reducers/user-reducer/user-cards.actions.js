import _ from 'lodash';

import { updateObjectArray } from '../../helpers/data.helper';
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
    let { creditCards } = getState().userReducer;
    if (_.isNull(creditCards)) {
      creditCards = [];
    }
    const card = await creditCardService.createCreditCard(data);
    dispatch(setCreditCardsLoadingAction(false));
    dispatch(setUserCreditCardsAction([...creditCards, card]));
    return card;
  } catch (error) {
    flashService.error('Could not create a credit card');
    console.warn(error.message);
    return error;
  }
};

export const getCardRegistrationStatusAction = (checkoutID) => async (dispatch) => {
  dispatch(setSubmitCardTransactionLoadingAction(true));
  const response = await creditCardService.getCardRegistrationStatus(checkoutID);
  dispatch(setSubmitCardTransactionLoadingAction(false));
  return response;
};

export const tokenizeCard = (data) => (dispatch) => {
  dispatch(setCreditCardsLoadingAction(true));
  return creditCardService
    .tokenizeCard(new URLSearchParams(data).toString())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      flashService.error('Could not tokenize your credit card.');
      console.warn(error.message);
    })
    .finally(() => dispatch(setCreditCardsLoadingAction(false)));
};

export const deleteUserCreditCardAction = (id) => (dispatch, getState) => {
  dispatch(setCreditCardsLoadingAction(true));
  return creditCardService
    .deleteCreditCard(id)
    .then(() => {
      const { creditCards } = getState().userReducer;

      _.remove(creditCards, (card) => {
        return _.get(card, 'id') === id;
      });

      return dispatch(setUserCreditCardsAction(creditCards));
    })
    .finally(() => {
      dispatch(setCreditCardsLoadingAction(false));
    });
};

export const updateUserCreditCardAction = (data = {}) => (dispatch, getState) => {
  dispatch(setCreditCardsLoadingAction(true));
  const id = _.get(data, 'id');

  return creditCardService
    .updateCreditCard(id, data)
    .then((changedCard) => {
      const { creditCards } = getState().userReducer;

      return dispatch(setUserCreditCardsAction(updateObjectArray(creditCards, changedCard)));
    })
    .finally(() => dispatch(setCreditCardsLoadingAction(false)));
};

export const setDefaultCreditCardAction = (id, card = {}) => (dispatch) => {
  dispatch(setCreditCardsLoadingAction(true));

  return creditCardService
    .updateCreditCard(id, { ...card, default: true })
    .then((changedCard) => {
      flashService.success('Card successfully set to default.');
      return changedCard;
    })
    .finally(() => dispatch(setCreditCardsLoadingAction(false)));
};
