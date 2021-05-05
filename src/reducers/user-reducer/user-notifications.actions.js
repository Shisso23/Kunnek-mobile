import { flashService, notificationService } from '../../services';
import {
  setNotificationHistoryLoadingAction,
  setUserNotificationHistoryAction,
} from './user.reducer';

export const getUserNotificationHistoryAction = () => async (dispatch) => {
  dispatch(setNotificationHistoryLoadingAction(true));
  try {
    const notifications = await notificationService.getNotifications();
    dispatch(setUserNotificationHistoryAction(notifications));
  } catch (error) {
    flashService.error('Could not load notifications');
    // eslint-disable-next-line no-console
    console.warn(error.message);
  } finally {
    dispatch(setNotificationHistoryLoadingAction(false));
  }
};
