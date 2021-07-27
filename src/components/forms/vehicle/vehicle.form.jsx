import React from 'react';
import _ from 'lodash';
import { View, ViewPropTypes, SafeAreaView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import { useTheme } from '../../../theme';

const VehicleForm = ({ submitForm, onSuccess, initialValues, containerStyle, submitText }) => {
  const { Layout } = useTheme();
  const validationSchema = Yup.object().shape({
    make: Yup.string().required('Vehicle make is required'),
    model: Yup.string().required('Vehicle model is required'),
    registrationNumber: Yup.string().required('Vehicle registration number is required'),
    type: Yup.string().required('Vehicle type is required'),
  });

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        onSuccess(formData);
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
          <View style={[Layout.fill, containerStyle]}>
            <Input
              value={values.make}
              onChangeText={handleChange('make')}
              onBlur={handleBlur('make')}
              label="Vehicle Make"
              errorMessage={error('make')}
            />

            <Input
              value={values.model}
              onChangeText={handleChange('model')}
              onBlur={handleBlur('model')}
              label="Vehicle Model"
              errorMessage={error('model')}
            />

            <Input
              value={values.type}
              onChangeText={handleChange('type')}
              onBlur={handleBlur('type')}
              label="Vehicle Type"
              errorMessage={error('type')}
            />

            <Input
              value={values.registrationNumber}
              onChangeText={handleChange('registrationNumber')}
              onBlur={handleBlur('registrationNumber')}
              label="License Plate"
              errorMessage={error('registrationNumber')}
            />
            <View style={Layout.fill} />
            <SafeAreaView>
              <Button
                onPress={handleSubmit}
                loading={isSubmitting}
                title={submitText ? submitText : 'Next'}
              />
            </SafeAreaView>
          </View>
        );
      }}
    </Formik>
  );
};

VehicleForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  submitText: PropTypes.string,
};

VehicleForm.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
  submitText: '',
};

export default VehicleForm;
