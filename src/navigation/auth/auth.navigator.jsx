import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../../screens/auth/sign-in/sign-in.screen';
import ForgotPasswordScene from '../../screens/auth/forgot-password/forgot-password.screen';
import RegisterScene from '../../screens/auth/register/register.screen';
import useTheme from '../../theme/hooks/useTheme';
import SignInOtpScreen from '../../screens/auth/sign-in-otp/sign-in-otp.screen';
import InitialScreen from '../../screens/auth/initial/initial.screen';

const AuthStack = createStackNavigator();
const AuthNavigator = () => {
  const { Custom } = useTheme();
  return (
    <AuthStack.Navigator screenOptions={Custom.globalNavigatorScreenOptions}>
      <AuthStack.Screen
        name="InitialScreen"
        component={InitialScreen}
        options={{
          title: 'Sign In',
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          title: 'Sign In',
        }}
      />
      <AuthStack.Screen
        name="SignInOtp"
        component={SignInOtpScreen}
        options={{
          title: 'Sign In Otp',
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScene}
        options={{ title: 'Forgot Password' }}
      />
      <AuthStack.Screen name="Register" component={RegisterScene} options={{ title: 'Register' }} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
