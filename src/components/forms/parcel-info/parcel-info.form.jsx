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
import { UploadDocumentButton } from '../../molecules';
import Label from '../../atoms/label';

const ParcelInfoForm = ({ submitForm, onSuccess, initialValues, containerStyle }) => {
  const { Layout } = useTheme();

  const validationSchema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    height: Yup.string().required('Height is required'),
    width: Yup.string().required('Width is required'),
    length: Yup.string().required('Length is required'),
    weight: Yup.string().required('Weight is required'),
    offerAmount: Yup.number().required('Offer Amount is required'),
    imageUri: Yup.string().required('Image is required'),
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
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              label="Description"
              errorMessage={error('description')}
            />
            <HelperText type="error" visible={error('description')}>
              {error('description')}
            </HelperText>

            <TextInput
              value={values.height}
              onChangeText={handleChange('height')}
              onBlur={handleBlur('height')}
              label="Height (cm's)"
              errorMessage={error('height')}
            />
            <HelperText type="error" visible={error('height')}>
              {error('height')}
            </HelperText>

            <TextInput
              value={values.width}
              onChangeText={handleChange('width')}
              onBlur={handleBlur('width')}
              label="Width (cm's)"
              errorMessage={error('width')}
            />
            <HelperText type="error" visible={error('width')}>
              {error('width')}
            </HelperText>

            <TextInput
              value={values.length}
              onChangeText={handleChange('length')}
              onBlur={handleBlur('length')}
              label="Length (cm's)"
              errorMessage={error('length')}
            />
            <HelperText type="error" visible={error('length')}>
              {error('length')}
            </HelperText>

            <TextInput
              value={values.weight}
              onChangeText={handleChange('weight')}
              onBlur={handleBlur('weight')}
              label="Weight (kg's)"
              errorMessage={error('weight')}
            />
            <HelperText type="error" visible={error('weight')}>
              {error('weight')}
            </HelperText>

            <TextInput
              value={values.offerAmount}
              onChangeText={handleChange('offerAmount')}
              onBlur={handleBlur('offerAmount')}
              label="Offer Amount"
              errorMessage={error('offerAmount')}
            />
            <HelperText type="error" visible={error('offerAmount')}>
              {error('offerAmount')}
            </HelperText>

            <UploadDocumentButton
              title="Upload Image"
              disabled={isSubmitting}
              onImageSelect={(image) => setFieldValue('imageUri', image)}
              style={[Layout.alignSelfCenter]}
            />

            <Button onPress={handleSubmit} loading={isSubmitting} mode="contained">
              Next
            </Button>

            {__DEV__ && <Text>{JSON.stringify(values, null, 2)}</Text>}
            {__DEV__ && <Text>{JSON.stringify(errors, null, 2)}</Text>}
          </View>
        );
      }}
    </Formik>
  );
};

ParcelInfoForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

ParcelInfoForm.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
};

export default ParcelInfoForm;
