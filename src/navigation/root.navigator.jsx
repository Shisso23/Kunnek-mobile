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

  const config = {
    screens: {
      APP: {
        screens: {
          ParcelRequests: 'my-parcels',
          ParcelRequestsDeliveries: 'my-deliveries',
          MyReviews: 'my-reviews',
          Review: 'review/:parcelRequest/:ratingType',
          UserDetails: 'accept-request-from-deliverer/:parcelRequest',
          Chat: 'chat/:chatId',
          ParcelDetails: 'confirm/:parcelRequest/:flowType',
          TransactionDetails: 'payment-details/:payment',
        },
      },
    },
  };

  const linking = {
    prefixes: ['https://kunnekp2p.com'],
    config,
  };
  return (
    <NavigationContainer linking={linking}>
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
