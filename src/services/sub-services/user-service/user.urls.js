import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  userUrl: (id) => `${apiUrl}/users/${id}`,
};
