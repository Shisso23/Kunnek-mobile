import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  notificationUrl: () => `${apiUrl}/notifications`,
};
