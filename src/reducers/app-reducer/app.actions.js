import { userAuthService } from '../../services';
import { setIsAuthenticatedAction } from '../user-auth-reducer/user-auth.reducer';

export const initAppAction = () => async (dispatch) => {
  const { doTokensExistInLocalStorage } = userAuthService;
  await dispatch(loadAppDataAction());
  const tokensExist = await doTokensExistInLocalStorage();
  if (tokensExist) {
    await dispatch(isAuthenticatedFlowAction());
  }
  // hide splash
};

export const isAuthenticatedFlowAction = () => (dispatch) =>
  Promise.all([dispatch(loadAppDataForSignedInUserAction())]).finally(() => {
    dispatch(setIsAuthenticatedAction(true));
  });

export const loadAppDataAction = () => () => Promise.all([]);

export const loadAppDataForSignedInUserAction = () => () => Promise.all([]);
