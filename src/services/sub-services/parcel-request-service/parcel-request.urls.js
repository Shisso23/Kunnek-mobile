import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  parcelRequestsUrl: () => `${apiUrl}/jobs`,
};
