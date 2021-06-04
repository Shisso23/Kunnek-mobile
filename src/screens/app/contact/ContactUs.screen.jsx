import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';

import ContactUsForm from '../../../components/forms/contact-us/ContactUs.form';
import { queryFormModel } from '../../../models/app/query-model/query.model';
import { queryService } from '../../../services';
import { _setQueryAction } from '../../../reducers/query-reducer/query.actions';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

const ContactUsScreen = () => {
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const submitForm = async (formData) => {
    return await queryService.createQuery({
      ...formData,
      userId: user.id,
    });
  };
  const onSuccess = (query) => {
    dispatch(_setQueryAction(query));
    navigation.navigate('Home');
  };

  return (
    <ContactUsForm
      containerStyle={styles.container}
      initialValues={queryFormModel()}
      onSuccess={onSuccess}
      submitForm={submitForm}
    />
  );
};

ContactUsScreen.propTypes = {};

ContactUsScreen.defaultProps = {};

export default ContactUsScreen;
