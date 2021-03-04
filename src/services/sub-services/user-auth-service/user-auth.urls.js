import appConfig from '../../../config';

const { hostUrl, apiUrl } = appConfig;
export default {
  tokenUrl: () => `${hostUrl}/oauth/token`,
  registerUrl: () => `${hostUrl}/users`,
  forgotPasswordUrl: () => `${hostUrl}/users/password`,
  verifyOtpUrl: () => `${apiUrl}/users/verify_otp`,
};
