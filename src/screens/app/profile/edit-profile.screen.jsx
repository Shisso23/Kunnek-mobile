import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { UserInfoForm } from '../../../components/forms';
import { FormScreenContainer } from '../../../components';
import { useTheme } from '../../../theme';
import { updateUserAction } from '../../../reducers/user-reducer/user.actions';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';

const EditProfileScreen = () => {
  const { Gutters } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const _handleFormSubmit = (form) => dispatch(updateUserAction(form));
  const { user } = useSelector(userSelector);

  const _onFormSuccess = () => {
    navigation.goBack();
  };

  return (
    <FormScreenContainer>
      <View style={[Gutters.smallHMargin]}>
        <Text h2>Update Profile</Text>
        <Text style={[Gutters.smallVMargin]}>Inspect and update your details here</Text>
      </View>
      <UserInfoForm
        submitForm={_handleFormSubmit}
        onSuccess={_onFormSuccess}
        initialValues={user}
        containerStyle={[Gutters.smallHMargin]}
        edit={true}
      />
    </FormScreenContainer>
  );
};

EditProfileScreen.propTypes = {};
EditProfileScreen.defaultProps = {};

export default EditProfileScreen;
