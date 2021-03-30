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
    weight: Yup.number().required('Weight is required'),
    price: Yup.number().round().required('First Name is required'),
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
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                placeholder="Item Description"
                errorMessage={error('description')}
              />

              <Input
                value={values.itemHeight}
                onChangeText={handleChange('itemHeight')}
                onBlur={handleBlur('itemHeight')}
                placeholder="Height (cms)"
                errorMessage={error('itemHeight')}
                keyboardType="number-pad"
              />

              <Input
                value={values.itemWidth}
                onChangeText={handleChange('itemWidth')}
                onBlur={handleBlur('itemWidth')}
                placeholder="Width (cms)"
                errorMessage={error('itemWidth')}
                keyboardType="numeric"
              />

              <Input
                value={values.itemLength}
                onChangeText={handleChange('itemLength')}
                onBlur={handleBlur('itemLength')}
                placeholder="Length (cms)"
                errorMessage={error('itemLength')}
                keyboardType="numeric"
              />

              <Input
                value={values.itemWeight}
                onChangeText={handleChange('itemWeight')}
                onBlur={handleBlur('itemWeight')}
                placeholder="Weight (kgs)"
                errorMessage={error('itemWeight')}
                keyboardType="numeric"
              />

              <Input
                value={values.price}
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                placeholder="Offer Amount"
                errorMessage={error('price')}
                keyboardType="numeric"
              />

              <UploadDocumentButton
                title="Upload"
                errorMessage={error('price')}
                onImageSelect={handleChange('price')}
              />

              <SafeAreaView>
                <Button
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  title={!edit ? 'Sign Up' : 'Update'}
                />
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
