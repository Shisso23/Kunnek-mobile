import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  vehiclesUrl: () => `${apiUrl}/vehicles`,
};
