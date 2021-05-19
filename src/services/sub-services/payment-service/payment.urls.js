import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  paymentUrl: () => `${apiUrl}/payments`,
  registration: () => `${appConfig.peachPayments.peachPaymentUrl}/registrations`,
  createCheckout: (id) => `${apiUrl}/payments/${id}/create_checkout`,
};
