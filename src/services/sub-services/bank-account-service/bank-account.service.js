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
      return userBankAccountModel(response.data);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const deleteBankAccount = (id) => {
  const url = bankAccountUrls.bankAccountsUrl();
  return authNetworkService.delete(`${url}/${id}`).catch((error) => {
    // eslint-disable-next-line no-console
    console.warn(error);
    return Promise.reject(error);
  });
};

const updateBankAccount = (id, data = {}) => {
  const url = bankAccountUrls.bankAccountsUrl();
  const dataModel = apiUserBankAccountModel(data);
  return authNetworkService
    .patch(`${url}/${id}`, dataModel)
    .then((response) => {
      return userBankAccountModel(response.data);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const setBankAccountDefault = (id) => {
  const url = bankAccountUrls.bankAccountsUrl();
  return authNetworkService
    .patch(`${url}/${id}`, { default: true })
    .then((response) => {
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
  deleteBankAccount,
  updateBankAccount,
  setBankAccountDefault,
};
