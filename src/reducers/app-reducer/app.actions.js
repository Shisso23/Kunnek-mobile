import RNBootSplash from 'react-native-bootsplash';
import _ from 'lodash';
import {
  setDoneLoadingAppDataAction,
  userAuthSelector,
} from '../user-auth-reducer/user-auth.reducer';
import { loadAuthStateAction } from '../user-auth-reducer/user-auth.actions';
import { AuthStates } from '../user-auth-reducer/user-auth.enums';
import {
  getUserAction,
  getUserDelivererIdAction,
  getUserSenderIdAction,
  updateDeviceTokenAction,
} from '../user-reducer/user.actions';
import { bankAccountService, firebaseService, flashService } from '../../services';
import { setBanksAction } from './app.reducer';
import messaging from '@react-native-firebase/messaging';

export const initAppAction = () => async (dispatch, getState) => {
  const { AUTHENTICATED } = AuthStates;
  await dispatch(loadAppDataAction());
  const { authState } = userAuthSelector(getState());
  try {
    if (authState === AUTHENTICATED) {
      await dispatch(isAuthenticatedFlowAction());
    }
  } finally {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 10); // force process to run a bit later.
    // ensures that the login screen is not shown when the user is authenticated.
  }
};

export const isAuthenticatedFlowAction = () => async (dispatch) => {
  await dispatch(loadAppDataForSignedInUserAction());
  await dispatch(setDoneLoadingAppDataAction(true));

  firebaseService.requestUserPermission().then((token) => {
    const deviceRegistrationToken = _.get(token, 'updateToken');
    if (deviceRegistrationToken) {
      dispatch(updateDeviceTokenAction({ deviceRegistrationToken }));
    }
  });
  const foregroundPushNotification = messaging().onMessage(async (remoteMessage) => {
    flashService.inbox(
      _.get(remoteMessage, 'notification.title', 'Kunnek'),
      _.get(remoteMessage, 'notification.body'),
    );
  });
  return foregroundPushNotification;
};

export const loadAppDataAction = () => (dispatch) => Promise.all([dispatch(loadAuthStateAction())]);

export const loadAppDataForSignedInUserAction = () => (dispatch) =>
  Promise.all([
    dispatch(getUserAction()),
    dispatch(getUserDelivererIdAction()),
    dispatch(getUserSenderIdAction()),
  ]);

export const getBankNames = () => (dispatch) => {
  bankAccountService.getBanks().then((banks) => {
    return dispatch(setBanksAction(banks));
  });
};
