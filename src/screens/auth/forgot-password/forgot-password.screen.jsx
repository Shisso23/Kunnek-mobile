import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, View } from 'react-native';
import { ForgotPasswordForm } from '../../../components/forms';
import { userAuthService } from '../../../services';
import { forgotPasswordModel } from '../../../models';
import { FormScreenContainer } from '../../../components';
import { useTheme } from '../../../theme';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const { Gutters, Layout, Images, Custom } = useTheme();
  const _handleFormSuccess = () => {
    navigation.replace('SignIn');
  };
  return (
    <FormScreenContainer contentContainerStyle={[Layout.scrollCenter]}>
      <SafeAreaView style={[Gutters.smallHMargin, Layout.scrollSpaceAround]}>
        <View style={Layout.colCenter}>
          <Image source={Images.logoDark} style={Custom.initialLogo} />
        </View>

        <ForgotPasswordForm
          submitForm={userAuthService.forgotPassword}
          initialValues={forgotPasswordModel()}
          onSuccess={_handleFormSuccess}
        />
      </SafeAreaView>
    </FormScreenContainer>
  );
};

ForgotPasswordScreen.propTypes = {};
ForgotPasswordScreen.defaultProps = {};

export default ForgotPasswordScreen;
