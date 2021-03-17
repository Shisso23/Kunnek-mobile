import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { UserInfoForm } from '../../../components/forms';
import { registrationUserModel } from '../../../models';
import { FormScreenContainer } from '../../../components';
import { useTheme } from '../../../theme';
import { signUpAction } from '../../../reducers/user-auth-reducer/user-auth.actions';

const RegisterScreen = () => {
  const { Gutters } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const _handleFormSubmit = (form) => dispatch(signUpAction(form));

  const _onFormSuccess = () => {
    navigation.replace('SignIn');
  };

  return (
    <FormScreenContainer>
      <UserInfoForm
        submitForm={_handleFormSubmit}
        onSuccess={_onFormSuccess}
        initialValues={registrationUserModel()}
        containerStyle={[Gutters.smallHMargin]}
      />
    </FormScreenContainer>
  );
};

RegisterScreen.propTypes = {};
RegisterScreen.defaultProps = {};

export default RegisterScreen;
