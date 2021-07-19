import _ from 'lodash';

export const userNotificationModel = (_apiNotificationModel = {}) => ({
  id: _.get(_apiNotificationModel, 'id', ''),
  message: _.get(_apiNotificationModel, 'message', ''),
  notificationType: _.get(_apiNotificationModel, 'notification_type', ''),
  response: _.get(_apiNotificationModel, 'response', {}),
  date: _.get(_apiNotificationModel, 'created_at', ''),
  read: _.get(_apiNotificationModel, 'read', ''),
});

export const constructUserNotificationModels = (apiNotificationModels) =>
  apiNotificationModels.map((notification) => userNotificationModel(notification));
