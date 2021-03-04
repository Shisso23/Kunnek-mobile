import React from 'react';
import _ from 'lodash';
import { ViewPropTypes, View } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { HelperText, TextInput, Button } from 'react-native-paper';
import { mobileNumberSchema, passwordSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { useTheme } from '../../../theme';

const SignInForm = ({ submitForm, onSuccess, containerStyle, initialValues }) => {
  const { Common } = useTheme();
  const validationSchema = Yup.object().shape({
    mobileNumber: mobileNumberSchema,
    password: passwordSchema,
  });

  const _handleFormSubmitError = (error, actions, formData) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else if (error.statusCode === 400) {
      actions.setFieldError('mobileNumber', 'Incorrect login credentials provided');
    } else {
      actions.setFieldError('mobileNumber', error.message);
    }
  };

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        onSuccess();
      })
      .catch((error) => _handleFormSubmitError(error, actions, formData));
  };

  return (
    <View style={containerStyle}>
      <Formik
        initialValues={initialValues}
        initialStatus={{ apiErrors: {} }}
        onSubmit={_handleSubmission}
        validationSchema={validationSchema}
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
        }) => {
          const error = (name) => getFormError(name, { touched, status, errors });
          return (
            <>
              <TextInput
                value={values.mobileNumber}
                onChangeText={handleChange('mobileNumber')}
                label="Mobile Number*"
                onBlur={handleBlur('mobileNumber')}
                keyboardType="email-address"
              />
              <HelperText style={[Common.errorStyle]} type="error" visible={error('mobileNumber')}>
                {error('mobileNumber')}
              </HelperText>

              <TextInput
                value={values.password}
                onChangeText={handleChange('password')}
                label="Password*"
                onBlur={handleBlur('password')}
                secureTextEntry
                errorMessage={error('password')}
              />
              <HelperText style={[Common.errorStyle]} type="error" visible={error('password')}>
                {error('password')}
              </HelperText>
              <Button mode="contained" onPress={handleSubmit} loading={isSubmitting}>
                Login
              </Button>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

SignInForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

SignInForm.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
};

export default SignInForm;
