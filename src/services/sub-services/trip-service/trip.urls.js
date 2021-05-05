import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  tripsUrl: () => `${apiUrl}/trips`,
};
