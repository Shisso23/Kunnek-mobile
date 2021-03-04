import config from '../../../config';
import { saveItem, getItem, removeItem } from './storage.service.utils';

const AUTH_STATE = 'AUTH_STATE';

const accessTokenOperations = {
  getAccessToken: () => getItem(config.accessTokenKey),
  storeAccessToken: (token) => saveItem(config.accessTokenKey, token),
  removeAccessToken: () => removeItem(config.accessTokenKey),
};

const refreshTokenOperations = {
  getRefreshToken: () => getItem(config.refreshTokenKey),
  storeRefreshToken: (token) => saveItem(config.refreshTokenKey, token),
  removeRefreshToken: () => removeItem(config.refreshTokenKey),
};

const authStateOperations = {
  getAuthState: () => getItem(AUTH_STATE),
  storeAuthState: (state) => saveItem(AUTH_STATE, state),
  removeAuthState: () => removeItem(AUTH_STATE),
};

export default {
  ...accessTokenOperations,
  ...refreshTokenOperations,
  ...authStateOperations,
};
