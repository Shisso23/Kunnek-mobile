import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import { setUserAction, setUserDelivererIdAction, setUserSenderIdAction } from './user.reducer';
import { flashService, userService } from '../../services';
import storageService from '../../services/sub-services/storage-service/storage.service';
import { getUserCreditCardsAction } from './user-cards.actions';
import { getUserBankAccountsAction } from './user-bank-account.actions';
import { getUserVehiclesAction } from './user-vehicles.actions';
import { getUserReviewsAction } from './user-reviews.actions.';

export const getUserAction = () => async (dispatch) => {
  const jwtToken = await storageService.getAccessToken();
  const decodedJwt = jwtDecode(jwtToken);
  const userId = _.get(decodedJwt, 'user.id', null);
  try {
    const user = await userService.getUser(userId);
    dispatch(setUserAction(user));
  } catch (error) {
    flashService.error('Could not fetch user');
    // eslint-disable-next-line no-console
    console.warn(error.message);
  }
};

export const getUserDelivererIdAction = () => async (dispatch) => {
  const id = await userService.getDelivererId();
  dispatch(setUserDelivererIdAction(id));
};

export const getUserSenderIdAction = () => async (dispatch) => {
  const id = await userService.getSenderId();
  dispatch(setUserSenderIdAction(id));
};

export const getFullProfileAction = () => (dispatch) =>
  Promise.all([
    dispatch(getUserCreditCardsAction()),
    dispatch(getUserBankAccountsAction()),
    dispatch(getUserVehiclesAction()),
    dispatch(getUserReviewsAction()),
  ]);

export const updateUserAction = (data = {}) => (dispatch) => {
  return userService.updateUser(data).then((updatedUser) => {
    return dispatch(setUserAction(updatedUser));
  });
};
