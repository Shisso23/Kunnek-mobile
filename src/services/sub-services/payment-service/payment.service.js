import { constructUserTransactionModels } from '../../../models/app/user/user-transaction-history.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import paymentUrls from './payment.urls';

const getTransactions = async () => {
  const url = paymentUrls.paymentUrl();
  const apiResponse = await authNetworkService.get(url);
  return constructUserTransactionModels(apiResponse.data);
};

export default {
  getTransactions,
};
