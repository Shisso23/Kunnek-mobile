import authUrls from './user-auth.urls';
import authUtils from './user-auth.utils';
import networkService from '../network-service/network.service';
import {
  apiRegistrationUserModel,
  registrationUserModel,
  apiForgotPasswordModel,
  forgotPasswordModel,
  apiSignInModel,
} from '../../../models';
import authNetworkService from '../auth-network-service/auth-network.service';

const signIn = (formData) => {
  const signInUrl = authUrls.tokenUrl();
  const apiModel = apiSignInModel(formData);
  const oAuthData = authUtils.constructOAuthSignInData(apiModel);
  return networkService.post(signInUrl, oAuthData).then(authUtils.storeAccessAndRefreshTokens);
};

const verifySignInOtp = async (otp) => {
  const verifyOtpUrl = authUrls.verifyOtpUrl();
  const { data } = await authNetworkService.post(verifyOtpUrl, { otp });
  if (!data.status) {
    throw new Error('Invalid OTP');
  }
};

const signOut = () => Promise.all([authUtils.removeAccessAndRefreshTokens()]);

const register = ({ formData }) => {
  const registerUrl = authUrls.registerUrl();
  const apiModel = apiRegistrationUserModel(formData);
  return networkService.post(registerUrl, apiModel).catch((err) => {
    err.errors = registrationUserModel(err.errors);
    return Promise.reject(err);
  });
};

const forgotPassword = ({ formData }) => {
  const forgotPasswordUrl = authUrls.forgotPasswordUrl();
  const apiModel = apiForgotPasswordModel(formData);

  return networkService.post(forgotPasswordUrl, apiModel).catch((err) => {
    err.errors = forgotPasswordModel(err.errors);
    return Promise.reject(err);
  });
};

export default {
  signIn,
  verifySignInOtp,
  signOut,
  register,
  forgotPassword,
};
