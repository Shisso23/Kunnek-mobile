import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import NavigationContainer from './navigation/root.navigator';
import { initAppAction } from './reducers/app-reducer/app.actions';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const dispatch = useDispatch();

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.warn('Message handled in the background!', remoteMessage);
  });

  useEffect(() => {
    dispatch(initAppAction());
  }, []);

  return <NavigationContainer />;
};

export default App;
