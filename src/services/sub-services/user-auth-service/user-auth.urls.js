import appConfig from '../../../config';

const { hostUrl, apiUrl } = appConfig;
export default {
  tokenUrl: () => `${hostUrl}/oauth/token`,
  registerUrl: () => `${hostUrl}/users`,
  forgotPasswordUrl: () => `${apiUrl}/users/password_reset_request`,
  verifyOtpUrl: () => `${apiUrl}/users/verify_otp`,
};
