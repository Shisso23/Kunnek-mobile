import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  actionsUrl: () => `${apiUrl}/actions`,
};
