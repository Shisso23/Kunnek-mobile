import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme';

const InitialScreen = () => {
  const navigation = useNavigation();
  const { Gutters } = useTheme();
  return (
    <SafeAreaView style={[Gutters.smallHMargin]}>
      <Button mode="contained" onPress={() => navigation.navigate('SignIn')}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('Register')}>
        Create An Account
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot Password
      </Button>
    </SafeAreaView>
  );
};

export default InitialScreen;
