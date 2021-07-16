import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import NavigationContainer from './navigation/root.navigator';
import { initAppAction } from './reducers/app-reducer/app.actions';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const App = () => {
  const dispatch = useDispatch();

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.warn('Message handled in the background!', remoteMessage);
  });

  useEffect(() => {
    dispatch(initAppAction());
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
      console.warn('Authorization status:', authStatus);
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.warn('Your Firebase Token is:', fcmToken);
    } else {
      console.warn('Failed', 'No token received');
    }
  };

  return <NavigationContainer />;
};

export default App;
