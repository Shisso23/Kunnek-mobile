import React from 'react';
import _ from 'lodash';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { HelperText, TextInput, Button } from 'react-native-paper';
import { mobileNumberSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { flashService } from '../../../services';

const ForgotPasswordForm = ({ submitForm, onSuccess, initialValues, containerStyle }) => {
  const validationSchema = Yup.object().shape({
    mobileNumber: mobileNumberSchema,
  });

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
              <TextInput
                value={values.mobileNumber}
                onChangeText={handleChange('mobileNumber')}
                onBlur={handleBlur('mobileNumber')}
                label="Mobile Number"
                errorMessage={error('mobileNumber')}
              />
              <HelperText type="error" visible={error('mobileNumber')}>
                {error('mobileNumber')}
              </HelperText>

              <Button mode="contained" onPress={handleSubmit} loading={isSubmitting}>
                Submit
              </Button>
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
