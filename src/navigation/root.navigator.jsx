import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from './auth/auth.navigator';
import AppNavigator from './app/app.navigator';
import { isAuthenticatedSelector } from '../reducers/user-auth-reducer/user-auth.reducer';

const RootStack = createStackNavigator();
const AppContainer = () => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="APP" component={AppNavigator} />
        ) : (
          <RootStack.Screen name="AUTH" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
