import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import { setUserAction } from './user.reducer';
import { flashService, userService } from '../../services';
import storageService from '../../services/sub-services/storage-service/storage.service';

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
