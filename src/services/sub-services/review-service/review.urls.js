import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  reviewsUrl: () => `${apiUrl}/reviews`,
  publicReviewsUrl: (id) => `${apiUrl}/users/${id}/reviews`,
};
