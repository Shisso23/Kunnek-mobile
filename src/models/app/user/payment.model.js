import _ from 'lodash';

export const paymentModel = (_apiPaymentModel = {}) => ({
  id: _.get(_apiPaymentModel, 'id', ''),
  amount: _.get(_apiPaymentModel, 'amount', ''),
  status: _.get(_apiPaymentModel, 'status', ''),
  jobId: _.get(_apiPaymentModel, 'job_id', ''),
  userId: _.get(_apiPaymentModel, 'user_id', ''),
  payableId: _.get(_apiPaymentModel, 'payable_id', ''),
  payableType: _.get(_apiPaymentModel, 'payable_type', ''),
  paymentType: _.get(_apiPaymentModel, 'payment_type', ''),
  date: _.get(_apiPaymentModel, 'created_at', false),
  job: _.get(_apiPaymentModel, 'job', false),
  reasonForFailure: _.get(_apiPaymentModel, 'reason_for_failure', true),
  checkout_id: _.get(_apiPaymentModel, 'checkout_id', ''),
});

export const apiPaymentModel = (_appPaymentModel = {}) => ({
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

export const constructPaymentModels = (apiTransactionModel) =>
  apiTransactionModel.map((transaction) => paymentModel(transaction));
