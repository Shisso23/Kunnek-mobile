import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ForgotPasswordForm } from '../../../components/forms';
import { userAuthService } from '../../../services';
import { forgotPasswordModel } from '../../../models';
import { FormScreenContainer } from '../../../components';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const _handleFormSuccess = () => {
    navigation.replace('SignIn');
  };
  return (
    <FormScreenContainer>
      <ForgotPasswordForm
        submitForm={userAuthService.forgotPassword}
        initialValues={forgotPasswordModel()}
        onSuccess={_handleFormSuccess}
      />
    </FormScreenContainer>
  );
};

ForgotPasswordScreen.propTypes = {};
ForgotPasswordScreen.defaultProps = {};

export default ForgotPasswordScreen;
