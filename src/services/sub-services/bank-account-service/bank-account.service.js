import { constructUserBankAccountModels } from '../../../models/app/user/user-bank-account.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import bankAccountUrls from './bank-account.urls';

const getBankAccounts = async () => {
  const url = bankAccountUrls.bankAccountsUrl();
  const apiResponse = await authNetworkService.get(url);
  return constructUserBankAccountModels(apiResponse.data);
};

export default {
  getBankAccounts,
};
