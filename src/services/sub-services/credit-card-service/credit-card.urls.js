import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  cardsUrl: () => `${apiUrl}/cards`,
};
