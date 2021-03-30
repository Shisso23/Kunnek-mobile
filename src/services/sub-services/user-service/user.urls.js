import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  userUrl: (id) => `${apiUrl}/users/${id}`,
  getDelivererId: () => `${apiUrl}/collectors/create_or_show`,
  getSenderId: () => `${apiUrl}/senders/create_or_show`,
};
