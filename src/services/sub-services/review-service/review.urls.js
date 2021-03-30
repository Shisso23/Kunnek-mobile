import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  reviewsUrl: () => `${apiUrl}/reviews`,
};
