import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, View } from 'react-native';
import { SignInForm } from '../../../components/forms';

import { signInModel } from '../../../models';
import { isAuthenticatedFlowAction } from '../../../reducers/app-reducer/app.actions';
import useTheme from '../../../theme/hooks/useTheme';
import { FormScreenContainer } from '../../../components';
import { signInAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import {
  setDoneLoadingAppDataAction,
  userAuthSelector,
} from '../../../reducers/user-auth-reducer/user-auth.reducer';
import { AuthStates } from '../../../reducers/user-auth-reducer/user-auth.enums';

const SignInScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { Gutters, Images, Custom, Layout } = useTheme();

  const { authState } = useSelector(userAuthSelector);

  const _handleFormSubmit = (signInForm) => dispatch(signInAction(signInForm));

  const _onSignInSuccess = async () => {
    if (authState === AuthStates.AUTHENTICATED || authState === AuthStates.NO_TOKEN) {
      await dispatch(isAuthenticatedFlowAction());
      await dispatch(setDoneLoadingAppDataAction(true));
    } else if (authState === AuthStates._2FA_PENDING) {
      navigation.navigate('SignInOtp');
    }
  };

  return (
    <FormScreenContainer contentContainerStyle={[Layout.scrollCenter]}>
      <SafeAreaView style={[Gutters.smallHMargin, Layout.scrollSpaceAround]}>
        <View style={Layout.colCenter}>
          <Image source={Images.logoDark} style={Custom.initialLogo} />
        </View>
        <SignInForm
          submitForm={_handleFormSubmit}
          onSuccess={_onSignInSuccess}
          initialValues={signInModel()}
          containerStyle={[Gutters.smallHMargin]}
        />
      </SafeAreaView>
    </FormScreenContainer>
  );
};

export default SignInScreen;
