import _ from 'lodash';

export const userBankAccountModel = (_apiUserModel = {}) => ({
  id: _.get(_apiUserModel, 'id', ''),
  accountNumber: _.get(_apiUserModel, 'obfuscated_account_number', ''),
  accountType: _.get(_apiUserModel, 'account_type', ''),
  bankId: _.get(_apiUserModel, 'bank_id', ''),
  default: _.get(_apiUserModel, 'default', false),
});

export const apiUserBankAccountModel = (_appUserModel = {}) => ({
  user: {
    email: _.get(_appUserModel, 'email', ''),
    name: _.get(_appUserModel, 'name', ''),
  },
});

export const constructUserBankAccountModels = (apiBankAccountModel) =>
  apiBankAccountModel.map((bankAccount) => userBankAccountModel(bankAccount));
