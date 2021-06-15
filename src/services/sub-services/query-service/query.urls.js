import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  createQueryUrl: () => `${apiUrl}/queries`,
  getQueriesUrl: () => `${apiUrl}/queries`,
};
