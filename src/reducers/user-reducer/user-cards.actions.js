import _ from 'lodash';
import { creditCardService, flashService } from '../../services';
import { setCreditCardsLoadingAction, setUserCreditCardsAction } from './user.reducer';
import appConfig from '../../config';

export const getUserCreditCardsAction = () => async (dispatch) => {
  dispatch(setCreditCardsLoadingAction(true));
  try {
    const cards = await creditCardService.getCreditCards();
    dispatch(setUserCreditCardsAction(cards));
  } catch (error) {
    flashService.error('Could not load credit cards');
    // eslint-disable-next-line no-console
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
    flashService.error('Could not create a credit card');
    // eslint-disable-next-line no-console
    console.warn(error.message);
    return error;
  }
};

export const tokenizeCard = (data) => (dispatch) => {
  dispatch(setCreditCardsLoadingAction(true));
  return creditCardService
    .tokenizeCard(new URLSearchParams(data).toString())
    .then((response) => response)
    .catch((error) => {
      flashService.error('Could not tokenize your credit card.');
      // eslint-disable-next-line no-console
      console.warn(error.message);
    })
    .finally(() => dispatch(setCreditCardsLoadingAction(false)));
};
