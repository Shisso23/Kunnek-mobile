import React from 'react';
import _ from 'lodash';
import { ViewPropTypes, View } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Input, Button, Text } from 'react-native-elements';
import { mobileNumberSchema, passwordSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import useTheme from '../../../theme/hooks/useTheme';

const SignInForm = ({ submitForm, onSuccess, containerStyle, initialValues }) => {
  const validationSchema = Yup.object().shape({
    mobileNumber: mobileNumberSchema,
    password: passwordSchema,
  });
  const { Gutters } = useTheme();

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
      .then((authState) => {
        actions.setSubmitting(false);
        onSuccess(authState);
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
              <Text h2>Login</Text>
              <Text style={[Gutters.smallVMargin]}>Add your details to login</Text>

              <Input
                value={values.mobileNumber}
                onChangeText={handleChange('mobileNumber')}
                placeholder="Mobile Number"
                onBlur={handleBlur('mobileNumber')}
                keyboardType="email-address"
                errorMessage={error('mobileNumber')}
              />

              <Input
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Password"
                onBlur={handleBlur('password')}
                secureTextEntry
                errorMessage={error('password')}
              />

              <Button title="Log In" onPress={handleSubmit} loading={isSubmitting} />
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
