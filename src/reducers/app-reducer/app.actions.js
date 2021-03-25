import RNBootSplash from 'react-native-bootsplash';
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
} from '../user-reducer/user.actions';

export const initAppAction = () => async (dispatch, getState) => {
  const { AUTHENTICATED } = AuthStates;
  await dispatch(loadAppDataAction());
  const { authState } = userAuthSelector(getState());
  try {
    if (authState === AUTHENTICATED) {
      await dispatch(isAuthenticatedFlowAction());
      dispatch(setDoneLoadingAppDataAction(true));
    }
  } finally {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 10); // force process to run a bit later.
    // ensures that the login screen is not shown when the user is authenticated.
  }
};

export const isAuthenticatedFlowAction = () => (dispatch) =>
  dispatch(loadAppDataForSignedInUserAction());

export const loadAppDataAction = () => (dispatch) => Promise.all([dispatch(loadAuthStateAction())]);

export const loadAppDataForSignedInUserAction = () => (dispatch) =>
  Promise.all([
    dispatch(getUserAction()),
    dispatch(getUserDelivererIdAction()),
    dispatch(getUserSenderIdAction()),
  ]);
