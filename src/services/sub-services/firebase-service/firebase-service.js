import messaging from '@react-native-firebase/messaging';
import firebaseUtils from './firebase-utils';

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const fcmTokenResponse = await getFcmToken();
    return fcmTokenResponse;
  }
};

const getFcmToken = async () => {
  const storedFcmToken = await firebaseUtils.getFcmToken();

  if (!storedFcmToken) {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      await firebaseUtils.storeFcmToken(fcmToken);
      return { updateToken: fcmToken };
    } else {
      requestUserPermission();
    }
  }
  return { existingToken: storedFcmToken };
};

export default {
  requestUserPermission,
};
