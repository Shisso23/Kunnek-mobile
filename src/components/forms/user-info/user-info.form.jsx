import React from 'react';
import _ from 'lodash';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { HelperText, TextInput, Button } from 'react-native-paper';
import {
  emailSchema,
  registerPasswordSchema,
  confirmPasswordSchema,
  termsAndConditionsSchema,
} from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { TermsAndConditions } from '../../atoms';
import { flashService } from '../../../services';

const UserInfoForm = ({ edit, submitForm, onSuccess, initialValues, containerStyle }) => {
  const validationSchema = Yup.object().shape({
    email: emailSchema,
    name: Yup.string().required('First Name is required'),
    surname: Yup.string().required('Last Name is required'),
    mobileNumber: Yup.string().required('Mobile number is required'),
    idNumber: Yup.string().required('Id is required'),
    password: registerPasswordSchema(edit),
    confirmPassword: confirmPasswordSchema(edit),
    termsAndConditions: termsAndConditionsSchema(edit),
  });

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        onSuccess();
      })
      .catch((error) => {
        actions.setSubmitting(false);
        if (_.get(error, 'statusCode') === 422) {
          const apiErrors = error.errors;
          flashService.error('Form Submission Error');
          actions.resetForm({ values: formData, status: { apiErrors } });
        }
      });
  };

  return (
    <View style={containerStyle}>
      <Formik
        initialValues={initialValues}
        initialStatus={{ apiErrors: {} }}
        onSubmit={_handleSubmission}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          isSubmitting,
          handleBlur,
          touched,
          status,
          setFieldValue,
        }) => {
          const error = (name) => getFormError(name, { touched, status, errors });
          return (
            <>
              <TextInput
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                label="First Name"
              />

              <HelperText type="error" visible={error('name')}>
                {error('name')}{' '}
              </HelperText>

              <TextInput
                value={values.surname}
                onChangeText={handleChange('surname')}
                onBlur={handleBlur('surname')}
                label="Last Name"
              />

              <HelperText type="error" visible={error('surname')}>
                {error('surname')}
              </HelperText>

              <TextInput
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                label="Email"
                errorMessage={error('email')}
                keyboardType="email-address"
              />

              <HelperText type="error" visible={error('email')}>
                {error('email')}{' '}
              </HelperText>

              <TextInput
                value={values.idNumber}
                onChangeText={handleChange('idNumber')}
                onBlur={handleBlur('idNumber')}
                label="Id Number"
                errorMessage={error('idNumber')}
                keyboardType="numeric"
              />

              <HelperText type="error" visible={error('idNumber')}>
                {error('idNumber')}
              </HelperText>

              <TextInput
                value={values.mobileNumber}
                onChangeText={handleChange('mobileNumber')}
                onBlur={handleBlur('mobileNumber')}
                label="Mobile Number"
                errorMessage={error('mobileNumber')}
                keyboardType="email-address"
              />

              <HelperText type="error" visible={error('mobileNumber')}>
                {error('mobileNumber')}{' '}
              </HelperText>

              {!edit && (
                <>
                  <TextInput
                    value={values.password}
                    onChangeText={handleChange('password')}
                    label="Password"
                    secureTextEntry
                    onBlur={handleBlur('password')}
                    errorMessage={error('password')}
                  />
                  <HelperText type="error" visible={error('password')}>
                    {error('password')}{' '}
                  </HelperText>
                  <TextInput
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    label="Confirm Password"
                    secureTextEntry
                    onBlur={handleBlur('confirmPassword')}
                    errorMessage={error('confirmPassword')}
                  />
                  <HelperText type="error" visible={error('confirmPassword')}>
                    {error('confirmPassword')}{' '}
                  </HelperText>
                </>
              )}
              {!edit && (
                <TermsAndConditions
                  checked={values.termsAndConditions}
                  onPress={() => setFieldValue('termsAndConditions', !values.termsAndConditions)}
                />
              )}
              <Button onPress={handleSubmit} loading={isSubmitting} mode="contained">
                {!edit ? 'Sign Up' : 'Update'}
              </Button>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

UserInfoForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  edit: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
};

UserInfoForm.defaultProps = {
  onSuccess: () => null,
  edit: false,
  containerStyle: {},
};

export default UserInfoForm;
