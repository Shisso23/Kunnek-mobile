import _ from 'lodash';

import { constructUserTransactionModels } from '../../../models/app/user/user-transaction-history.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import paymentUrls from './payment.urls';
import { apiPaymentModel, paymentModel } from '../../../models/app/user/payment.model';

export const PAYMENT_TYPES = {
  verification: 'verification',
  paidBySender: 'paid_by_sender',
  paidToDeliverer: 'paid_to_deliverer',
};

const getTransactions = async () => {
  const url = paymentUrls.paymentUrl();
  const apiResponse = await authNetworkService.get(url);
  return constructUserTransactionModels(apiResponse.data);
};

const create = (data = {}) => {
  const url = paymentUrls.paymentUrl();
  const _createAndReturnModel = (apiResponse) => paymentModel(apiResponse.data);
  return authNetworkService
    .post(`${url}`, apiPaymentModel(data))
    .then(_createAndReturnModel)
    .catch((error) => {
      console.warn(error);
      return Promise.reject(error);
    });
};

const fetchCheckoutId = (id, data) => {
  return authNetworkService.post(paymentUrls.createCheckout(id), data).then((response) => {
    return paymentModel(_.get(response, 'data'));
  });
};

export default {
  getTransactions,
  fetchCheckoutId,
  create,
};
