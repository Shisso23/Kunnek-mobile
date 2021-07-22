import React from 'react';
import _ from 'lodash';
import { SafeAreaView, StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Image, Input } from 'react-native-elements';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import { useTheme } from '../../../theme';

const CreditCardForm = ({
  submitForm,
  onSuccess,
  initialValues,
  submitText,
  submitButtonStyle,
  disabled,
}) => {
  const { Layout } = useTheme();

  const validationSchema = Yup.object().shape({
    cardHolder: Yup.string().required('Name on Card'),
    cardNumber: Yup.string()
      .required('Card Number')
      .length(16, 'Card Number must be 16 characters'),
    expiryDate: Yup.string()
      .required('Expiry Date is required')
      .length(5, 'Expiry needs to be 5 characters long')
      .matches(
        /^\d{2}\/\d{2}$/,
        'Expiry date needs to be in the following format: MM/YY. Eg: 11/25',
      )
      .test(
        'is-greater-than-today',
        `Expiry Date needs to be in the future (greater than ${dayjs().format('MM/YY')})`,
        (value) => {
          dayjs.extend(customParseFormat);
          const date = dayjs(value, 'MM/YY');
          return date > dayjs();
        },
      ),
    cvv: Yup.string()
      .required('CVV')
      .matches(
        /^\d{3,4}$/,
        'CVV needs to be between 3 and 4 characters long and only contain digits',
      ),
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
          <>
            <Input
              value={values.cardHolder}
              label="Name on Card"
              onChangeText={handleChange('cardHolder')}
              onBlur={handleBlur('cardHolder')}
              placeholder="Name on Card"
              errorMessage={error('cardHolder')}
              disabled={disabled}
            />
            <Input
              value={values.cardNumber}
              label="Card Number"
              onChangeText={handleChange('cardNumber')}
              onBlur={handleBlur('cardNumber')}
              placeholder="Card Number"
              errorMessage={error('cardNumber')}
              keyboardType="number-pad"
              disabled={disabled}
            />
            <View style={[Layout.row, Layout.justifyContentAround]}>
              <Input
                containerStyle={styles.halfWidthInput}
                label="CVV"
                value={values.cvv}
                onChangeText={handleChange('cvv')}
                onBlur={handleBlur('cvv')}
                placeholder="CVV"
                errorMessage={error('cvv')}
                keyboardType="numeric"
                disabled={disabled}
              />
              <Input
                containerStyle={styles.halfWidthInput}
                label="Exp. Date"
                value={values.expiryDate}
                onChangeText={handleChange('expiryDate')}
                onBlur={handleBlur('expiryDate')}
                placeholder="Exp. Date"
                errorMessage={error('expiryDate')}
                disabled={disabled}
              />
            </View>
            <>
              <Image
                source={require('../../../assets/images/powered-by-peach-payments.png')}
                containerStyle={styles.peachPaymentsImage}
              />
              <View style={Layout.fill} />
              {!disabled && (
                <SafeAreaView>
                  <Button
                    onPress={handleSubmit}
                    loading={isSubmitting}
                    title={submitText ? submitText : 'Complete'}
                    style={submitButtonStyle}
                  />
                </SafeAreaView>
              )}
            </>
          </>
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
  submitText: PropTypes.string,
  disabled: PropTypes.bool,
  submitButtonStyle: PropTypes.object,
};

CreditCardForm.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
  submitButtonStyle: {},
  submitText: '',
  disabled: false,
};

export default CreditCardForm;

const styles = StyleSheet.create({
  halfWidthInput: {
    width: '48%',
  },
  peachPaymentsImage: {
    height: 100,
    marginHorizontal: 10,
    width: 200,
  },
});
