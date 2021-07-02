import {
  apiUserBankAccountModel,
  constructUserBankAccountModels,
  userBankAccountModel,
} from '../../../models/app/user/user-bank-account.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import bankAccountUrls from './bank-account.urls';

const getBankAccounts = async () => {
  const url = bankAccountUrls.bankAccountsUrl();
  const apiResponse = await authNetworkService.get(url);
  return constructUserBankAccountModels(apiResponse.data);
};

const getBanks = () => {
  const url = bankAccountUrls.bankNamesUrl();
  return authNetworkService.get(url).then((response) => response.data);
};

const createBankAccount = (data = {}) => {
  const url = bankAccountUrls.bankAccountsUrl();
  const dataModel = apiUserBankAccountModel(data);
  return authNetworkService
    .post(url, dataModel)
    .then((response) => {
      //error just before this line gets executed: Warning: An unhandled error was caught from submitForm() [TypeError: undefined is not an object (evaluating 'dispatch((0, _userBankAccount.createUserBankAccountsAction)(currentForm)).then')]
      return userBankAccountModel(response.data);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

export default {
  getBankAccounts,
  createBankAccount,
  getBanks,
};
