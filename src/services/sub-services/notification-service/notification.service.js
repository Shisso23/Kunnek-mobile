import { constructUserNotificationModels } from '../../../models/app/user/user-notification-history.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import notificationUrls from './notification.urls';

const getNotifications = async () => {
  const url = notificationUrls.notificationUrl();
  const apiResponse = await authNetworkService.get(url);
  return constructUserNotificationModels(apiResponse.data);
};

export default {
  getNotifications,
};
