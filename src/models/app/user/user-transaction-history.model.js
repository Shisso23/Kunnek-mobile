import _ from 'lodash';

export const userTransactionModel = (_apiTransactionModel = {}) => ({
  id: _.get(_apiTransactionModel, 'id', ''),
  amount: _.get(_apiTransactionModel, 'amount', ''),
  status: _.get(_apiTransactionModel, 'status', ''),
  jobId: _.get(_apiTransactionModel, 'job_id', ''),
  userId: _.get(_apiTransactionModel, 'user_id', ''),
  payableId: _.get(_apiTransactionModel, 'payable_id', ''),
  payableType: _.get(_apiTransactionModel, 'payable_type', ''),
  paymentType: _.get(_apiTransactionModel, 'payment_type', ''),
  date: _.get(_apiTransactionModel, 'created_at', false),
  job: _.get(_apiTransactionModel, 'job', false),
  reasonForFailure: _.get(_apiTransactionModel, 'reason_for_failure', true),
});

export const apiUserTransactionModel = (_appUserModel = {}) => ({
  user: {
    email: _.get(_appUserModel, 'email', ''),
    name: _.get(_appUserModel, 'name', ''),
  },
});

export const constructUserTransactionModels = (apiTransactionModel) =>
  apiTransactionModel.map((transaction) => userTransactionModel(transaction));
