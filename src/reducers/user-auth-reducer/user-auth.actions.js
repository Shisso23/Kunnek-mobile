import _ from 'lodash';
import jwtDecode from 'jwt-decode';

import { userAuthService } from '../../services';
import storageService from '../../services/sub-services/storage-service/storage.service';
import { setAuthStateAction } from './user-auth.reducer';
import { AuthStates } from './user-auth.enums';
import { removeDeviceTokenAction } from '../user-reducer/user.actions';

export const signInAction = (signInForm) => async (dispatch) => {
  await userAuthService.signIn(signInForm);
  const jwtToken = await storageService.getAccessToken();
  const decodedJwt = jwtDecode(jwtToken);
  const usesTwoFactorAuth = _.get(decodedJwt, 'user.use_two_factor_auth', true);
  let currentState;
  if (usesTwoFactorAuth) {
    currentState = AuthStates._2FA_PENDING;
  } else {
    currentState = AuthStates.AUTHENTICATED;
  }
  await dispatch(storeAuthStateAction(currentState));
  return currentState;
};

export const signUpAction = (form) => async () => {
  await userAuthService.signUp(form);
};

export const verifySignInOtpAction = ({ numeric }) => async (dispatch) => {
  await userAuthService.verifySignInOtp(numeric);
  await dispatch(storeAuthStateAction(AuthStates.AUTHENTICATED));
};

export const signOutAction = () => (dispatch) => {
  dispatch(removeDeviceTokenAction()).then(() => {
    userAuthService.signOut().then(() => {
      dispatch(storeAuthStateAction(AuthStates.NO_TOKEN));
    });
  });
};

export const storeAuthStateAction = (state) => async (dispatch) => {
  await storageService.storeAuthState(state);
  await dispatch(setAuthStateAction(state));
};

export const loadAuthStateAction = () => async (dispatch) => {
  const authState = await storageService.getAuthState();
  if (!_.isNil(authState)) {
    await dispatch(setAuthStateAction(authState));
  }
};
