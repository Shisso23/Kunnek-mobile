import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import ContactUsForm from '../../../components/forms/contact-us/ContactUs.form';
import { queryFormModel } from '../../../models/app/query-model/query.model';
import { queryService } from '../../../services';
import { _setQueryAction } from '../../../reducers/query-reducer/query.actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../../theme';

const ContactUsScreen = () => {
  const { user } = useSelector(userSelector);
  const { Layout } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const submitForm = async (formData) => {
    return await queryService.createQuery({
      ...formData,
      userId: _.get(user, 'id', ''),
    });
  };
  const onSuccess = (query) => {
    dispatch(_setQueryAction(query));
    navigation.navigate('Home');
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={Layout.fill}>
      <ContactUsForm
        containerStyle={styles.container}
        initialValues={queryFormModel()}
        onSuccess={onSuccess}
        submitForm={submitForm}
      />
    </KeyboardAwareScrollView>
  );
};

ContactUsScreen.propTypes = {};

ContactUsScreen.defaultProps = {};

export default ContactUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
