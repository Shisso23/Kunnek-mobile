import _ from 'lodash';

export const userBankAccountModel = (_apiUserModel = {}) => ({
  id: _.get(_apiUserModel, 'id', ''),
  accountNumber: _.get(_apiUserModel, 'obfuscated_account_number', ''),
  accountType: _.get(_apiUserModel, 'account_type', ''),
  bankId: _.get(_apiUserModel, 'bank_id', ''),
  default: _.get(_apiUserModel, 'default', false),
  delivererId: _.get(_apiUserModel, 'collector_id', _.get(_apiUserModel, 'delivererId')),
});

export const apiUserBankAccountModel = (_appUserModel = {}) => ({
  bank_account: {
    account_number: _.get(_appUserModel, 'accountNumber', ''),
    account_type: _.get(_appUserModel, 'accountType', ''),
    collector_id: _.get(_appUserModel, 'delivererId'),
    bank_id: _.get(_appUserModel, 'bankId', ''),
  },
});

export const constructUserBankAccountModels = (apiBankAccountModel) =>
  apiBankAccountModel.map((bankAccount) => userBankAccountModel(bankAccount));
