import React from 'react';
import _ from 'lodash';
import { SafeAreaView, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button, Input } from 'react-native-elements';
import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import UploadDocumentButton from '../../molecules/upload-document-button';

const SendParcelItemDetailsForm = ({
  edit,
  submitForm,
  onSuccess,
  initialValues,
  containerStyle,
}) => {
  const validationSchema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    itemHeight: Yup.number().required('Height is required').positive(),
    itemWidth: Yup.number().required('Width is required').positive(),
    itemLength: Yup.number().required('Length is required').positive(),
    itemWeight: Yup.number().required('Weight is required').positive(),
    price: Yup.string()
      .required('Offer Amount is required')
      .matches(/^\d+(?:\.\d{0,2})$/, 'Offer amount needs to be in this format: 10.00'),
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
              <Input
                value={values.description}
                label="Item Description"
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                placeholder="Item Description"
                errorMessage={error('description')}
              />

              <Input
                value={values.itemHeight}
                label="Height (cms)"
                onChangeText={handleChange('itemHeight')}
                onBlur={handleBlur('itemHeight')}
                placeholder="Height (cms)"
                errorMessage={error('itemHeight')}
                keyboardType="number-pad"
              />

              <Input
                value={values.itemWidth}
                label="Width (cms)"
                onChangeText={handleChange('itemWidth')}
                onBlur={handleBlur('itemWidth')}
                placeholder="Width (cms)"
                errorMessage={error('itemWidth')}
                keyboardType="numeric"
              />

              <Input
                value={values.itemLength}
                label="Length (cms)"
                onChangeText={handleChange('itemLength')}
                onBlur={handleBlur('itemLength')}
                placeholder="Length (cms)"
                errorMessage={error('itemLength')}
                keyboardType="numeric"
              />

              <Input
                value={values.itemWeight}
                label="Weight (kgs)"
                onChangeText={handleChange('itemWeight')}
                onBlur={handleBlur('itemWeight')}
                placeholder="Weight (kgs)"
                errorMessage={error('itemWeight')}
                keyboardType="numeric"
              />

              <Input
                value={values.price}
                label="Offer Amount"
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                placeholder="Offer Amount"
                errorMessage={error('price')}
                keyboardType="numeric"
              />

              <UploadDocumentButton
                label="Upload"
                errorMessage={error('photoUri')}
                onImageSelect={handleChange('photoUri')}
              />

              <SafeAreaView>
                <Button onPress={handleSubmit} loading={isSubmitting} title="Next" />
              </SafeAreaView>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

SendParcelItemDetailsForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  edit: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
};

SendParcelItemDetailsForm.defaultProps = {
  onSuccess: () => null,
  edit: false,
  containerStyle: {},
};

export default SendParcelItemDetailsForm;
