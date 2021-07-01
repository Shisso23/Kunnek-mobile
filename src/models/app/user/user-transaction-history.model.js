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
  reasonForFailure: _.get(_apiTransactionModel, 'reason_for_failure', ''),
  invoiceNumber: _.get(_apiTransactionModel, 'invoice_number', ''),
  sender: _.get(_apiTransactionModel, 'sender', {}),
  driver: _.get(_apiTransactionModel, 'driver', {}),
});

export const apiUserTransactionModel = (_appPaymentModel = {}) => ({
  payment: {
    id: _.get(_appPaymentModel, 'id', ''),
    amount: _.get(_appPaymentModel, 'amount', ''),
    status: _.get(_appPaymentModel, 'status', ''),
    job_id: _.get(_appPaymentModel, 'jobId', ''),
    user_id: _.get(_appPaymentModel, 'userId', ''),
    payable_id: _.get(_appPaymentModel, 'payableId', ''),
    payable_type: _.get(_appPaymentModel, 'payableType', ''),
    payment_type: _.get(_appPaymentModel, 'paymentType', ''),
    created_at: _.get(_appPaymentModel, 'date', false),
    job: _.get(_appPaymentModel, 'job', false),
    reason_for_failure: _.get(_appPaymentModel, 'reasonForFailure', true),
  },
});

export const constructUserTransactionModels = (apiTransactionModel) =>
  apiTransactionModel.map((transaction) => userTransactionModel(transaction));
