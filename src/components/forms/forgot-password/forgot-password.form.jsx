import React from 'react';
import _ from 'lodash';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Text, Input, Button } from 'react-native-elements';
import { mobileNumberSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import useTheme from '../../../theme/hooks/useTheme';

const ForgotPasswordForm = ({ submitForm, onSuccess, initialValues, containerStyle }) => {
  const validationSchema = Yup.object().shape({
    mobileNumber: mobileNumberSchema,
  });
  const { Gutters } = useTheme();

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        flashService.success(
          'Instructions to reset your password will be sent to your mobile number',
        );
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
        }) => {
          const error = (name) => getFormError(name, { touched, status, errors });
          return (
            <>
              <View>
                <Text h2>Reset Password</Text>
                <Text style={[Gutters.smallVMargin]}>
                  Please enter your mobile number to receive a link to reset your password.
                </Text>
              </View>

              <Input
                value={values.mobileNumber}
                onChangeText={handleChange('mobileNumber')}
                onBlur={handleBlur('mobileNumber')}
                placeholder="Mobile Number"
                errorMessage={error('mobileNumber')}
              />

              <Button onPress={handleSubmit} loading={isSubmitting} title="Submit" />
            </>
          );
        }}
      </Formik>
    </View>
  );
};

ForgotPasswordForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  initialValues: PropTypes.object.isRequired,
};

ForgotPasswordForm.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
};

export default ForgotPasswordForm;
