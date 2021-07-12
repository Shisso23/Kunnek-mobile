import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { FormScreenContainer, Index } from '../../../components';
import { NumericalInputForm } from '../../../components/forms';
import { isAuthenticatedFlowAction } from '../../../reducers/app-reducer/app.actions';
import { verifySignInOtpAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import { useTheme } from '../../../theme';

const SignInOtpScreen = () => {
  const dispatch = useDispatch();
  const _handleFormSubmit = (formData) => dispatch(verifySignInOtpAction(formData));
  const { Layout, Gutters } = useTheme();

  const _handleFormSuccess = () => {
    dispatch(isAuthenticatedFlowAction());
  };
  return (
    <FormScreenContainer>
      <Index title="Authentication OTP" />
      <View style={[Layout.center, Gutters.largeVMargin]}>
        <Text>Please enter the OTP sent to your mobile number:</Text>
      </View>
      <NumericalInputForm
        submitForm={_handleFormSubmit}
        initialValues={{
          numeric: '',
        }}
        onSuccess={_handleFormSuccess}
      />
    </FormScreenContainer>
  );
};

export default SignInOtpScreen;
