import messaging from '@react-native-firebase/messaging';

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
  const fcmToken = await messaging().getToken();

  if (fcmToken) {
    return { updateToken: fcmToken };
  } else {
    requestUserPermission();
  }
};

export default {
  requestUserPermission,
};
