import _ from 'lodash';

export const userNotificationModel = (_apiTransactionModel = {}) => ({
  id: _.get(_apiTransactionModel, 'id', ''),
  message: _.get(_apiTransactionModel, 'message', ''),
  notificationType: _.get(_apiTransactionModel, 'notification_type', ''),
  response: _.get(_apiTransactionModel, 'response', {}),
  date: _.get(_apiTransactionModel, 'created_at', ''),
  read: _.get(_apiTransactionModel, 'read', ''),
});

export const constructUserNotificationModels = (apiTransactionModel) =>
  apiTransactionModel.map((transaction) => userNotificationModel(transaction));
