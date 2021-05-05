import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  paymentUrl: () => `${apiUrl}/payments`,
};
