import { userAuthService } from '../../services';
import { setIsAuthenticatedAction } from './user-auth.reducer';

export const signOutAction = () => (dispatch) => {
  userAuthService.signOut().then(() => {
    dispatch(setIsAuthenticatedAction(false));
  });
};
