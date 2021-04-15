import React from 'react';
import _ from 'lodash';
import { Text, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { TextInput, Button, HelperText } from 'react-native-paper';
import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import { useTheme } from '../../../theme';

const CreditCardForm = ({ submitForm, onSuccess, initialValues, containerStyle }) => {
  const { Layout } = useTheme();

  const validationSchema = Yup.object().shape({
    make: Yup.string().required('Length is required'),
    model: Yup.string().required('Weight is required'),
    registrationNumber: Yup.string().required('Height is required'),
    type: Yup.string().required('Width is required'),
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
        setFieldValue,
      }) => {
        const error = (name) => getFormError(name, { touched, status, errors });
        return (
          <View style={containerStyle}>
            <TextInput
              value={values.make}
              onChangeText={handleChange('make')}
              onBlur={handleBlur('make')}
              label="Make"
              errorMessage={error('make')}
            />
            <HelperText type="error" visible={error('make')}>
              {error('make')}
            </HelperText>

            <TextInput
              value={values.model}
              onChangeText={handleChange('model')}
              onBlur={handleBlur('model')}
              label="Model"
              errorMessage={error('model')}
            />
            <HelperText type="error" visible={error('model')}>
              {error('model')}
            </HelperText>

            <TextInput
              value={values.registrationNumber}
              onChangeText={handleChange('registrationNumber')}
              onBlur={handleBlur('registrationNumber')}
              label="License Plate"
              errorMessage={error('registrationNumber')}
            />
            <HelperText type="error" visible={error('registrationNumber')}>
              {error('registrationNumber')}
            </HelperText>

            <Button onPress={handleSubmit} loading={isSubmitting} mode="contained">
              Add Vehicle
            </Button>

            {__DEV__ && <Text>{JSON.stringify(values, null, 2)}</Text>}
            {__DEV__ && <Text>{JSON.stringify(errors, null, 2)}</Text>}
          </View>
        );
      }}
    </Formik>
  );
};

CreditCardForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

CreditCardForm.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
};

export default CreditCardForm;
