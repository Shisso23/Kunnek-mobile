import React from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { FormScreenContainer } from '../../../components';
import { NumericalInputForm } from '../../../components/forms';
import { isAuthenticatedFlowAction } from '../../../reducers/app-reducer/app.actions';
import { verifySignInOtpAction } from '../../../reducers/user-auth-reducer/user-auth.actions';

const SignInOtpScreen = () => {
  const dispatch = useDispatch();
  const _handleFormSubmit = (formData) => dispatch(verifySignInOtpAction(formData));

  const _handleFormSuccess = () => {
    dispatch(isAuthenticatedFlowAction());
  };
  return (
    <FormScreenContainer>
      <Text>Please enter the OTP sent to your mobile number:</Text>
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
