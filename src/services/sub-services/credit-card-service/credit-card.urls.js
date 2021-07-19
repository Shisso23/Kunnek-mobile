import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  cardsUrl: () => `${apiUrl}/cards`,
  createCheckoutUrl: () => `${apiUrl}/cards/create_checkout`,
};
