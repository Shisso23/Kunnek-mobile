import RNBootSplash from 'react-native-bootsplash';
import {
  setDoneLoadingAppDataAction,
  userAuthSelector,
} from '../user-auth-reducer/user-auth.reducer';
import { loadAuthStateAction } from '../user-auth-reducer/user-auth.actions';
import { AuthStates } from '../user-auth-reducer/user-auth.enums';

export const initAppAction = () => async (dispatch, getState) => {
  const { AUTHENTICATED } = AuthStates;
  const { authState } = userAuthSelector(getState());
  await dispatch(loadAppDataAction());
  if (authState === AUTHENTICATED) {
    await dispatch(isAuthenticatedFlowAction());
  }
  await dispatch(setDoneLoadingAppDataAction(true));

  setTimeout(() => {
    RNBootSplash.hide({ fade: true });
  }, 10); // force process to run a bit later.
  // ensures that the login screen is not shown when the user is authenticated.
};

export const isAuthenticatedFlowAction = () => (dispatch) =>
  Promise.all([dispatch(loadAppDataForSignedInUserAction())]);

export const loadAppDataAction = () => (dispatch) => Promise.all([dispatch(loadAuthStateAction())]);

export const loadAppDataForSignedInUserAction = () => () => Promise.all([]);
