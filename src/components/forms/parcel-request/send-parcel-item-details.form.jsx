import React from 'react';
import _ from 'lodash';
import { SafeAreaView, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from 'react-native-elements';

import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import UploadDocumentButton from '../../molecules/upload-document-button';

const SendParcelItemDetailsForm = ({ submitForm, onSuccess, initialValues }) => {
  const validationSchema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    itemHeight: Yup.number().positive(),
    itemWidth: Yup.number().positive(),
    itemLength: Yup.number().positive(),
    itemWeight: Yup.number().required('Weight is required').positive(),
    price: Yup.number()
      .test('is-currency', 'Please type a currency value eg: 12.34', (price) => {
        if (price) return Number(price.toFixed(2)) === Number(price);
      })
      .required('Offer Amount is required'),
  });

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then(() => {
        onSuccess().then(() => actions.setSubmitting(false));
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
        setFieldValue,
        touched,
        status,
      }) => {
        const error = (name) => getFormError(name, { touched, status, errors });

        const _convertToNumber = (number) => {
          if (number) {
            return _.replace(number, ',', '.');
          } else {
            return number;
          }
        };

        const _handleChangePrice = (price) => {
          setFieldValue('price', _convertToNumber(price), true);
        };
        const _handleChangeHeight = (height) => {
          setFieldValue('itemHeight', _convertToNumber(height), true);
        };
        const _handleChangeWidth = (width) => {
          setFieldValue('itemWidth', _convertToNumber(width), true);
        };
        const _handleChangeLength = (length) => {
          setFieldValue('itemLength', _convertToNumber(length), true);
        };
        const _handleChangeWeight = (weight) => {
          setFieldValue('itemWeight', _convertToNumber(weight), true);
        };

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
              onChangeText={_handleChangeHeight}
              onBlur={handleBlur('itemHeight')}
              placeholder="Height (cms)"
              errorMessage={error('itemHeight')}
              keyboardType="numeric"
            />

            <Input
              value={values.itemWidth}
              label="Width (cms)"
              onChangeText={_handleChangeWidth}
              onBlur={handleBlur('itemWidth')}
              placeholder="Width (cms)"
              errorMessage={error('itemWidth')}
              keyboardType="numeric"
            />

            <Input
              value={values.itemLength}
              label="Length (cms)"
              onChangeText={_handleChangeLength}
              onBlur={handleBlur('itemLength')}
              placeholder="Length (cms)"
              errorMessage={error('itemLength')}
              keyboardType="numeric"
            />

            <Input
              value={values.itemWeight}
              label="Weight (kgs)"
              onChangeText={_handleChangeWeight}
              onBlur={handleBlur('itemWeight')}
              placeholder="Weight (kgs)"
              errorMessage={error('itemWeight')}
              keyboardType="numeric"
            />

            <Input
              value={values.price}
              label="Offer Amount"
              onChangeText={_handleChangePrice}
              onBlur={handleBlur('price')}
              placeholder="Offer Amount"
              errorMessage={error('price')}
              keyboardType="numeric"
            />

            <UploadDocumentButton
              label="Upload Image"
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
  );
};

SendParcelItemDetailsForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

SendParcelItemDetailsForm.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
};

export default SendParcelItemDetailsForm;
