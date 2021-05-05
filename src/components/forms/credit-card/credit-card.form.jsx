import React from 'react';
import _ from 'lodash';
import { SafeAreaView, StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button, Divider, Image, Input, Text } from 'react-native-elements';
import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import { useTheme } from '../../../theme';
import Index from '../../atoms/title';

const CreditCardForm = ({ submitForm, onSuccess, initialValues, containerStyle }) => {
  const { Fonts, Gutters, Layout } = useTheme();

  const validationSchema = Yup.object().shape({
    cardHolder: Yup.string().required('Name on Card'),
    cardNumber: Yup.string().required('Card Number'),
    expiryDate: Yup.string().required('Exp. Date'),
    cvv: Yup.string().required('CVV'),
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
                value={values.cardHolder}
                label="Name on Card"
                onChangeText={handleChange('cardHolder')}
                onBlur={handleBlur('cardHolder')}
                placeholder="Name on Card"
                errorMessage={error('cardHolder')}
              />

              <Input
                value={values.cardNumber}
                label="Card Number"
                onChangeText={handleChange('cardNumber')}
                onBlur={handleBlur('cardNumber')}
                placeholder="Card Number"
                errorMessage={error('cardNumber')}
                keyboardType="number-pad"
              />

              <View style={[Layout.row, Layout.justifyContentAround]}>
                <Input
                  containerStyle={styles.halfWidthInput}
                  label="Exp. Date"
                  value={values.expiryDate}
                  onChangeText={handleChange('expiryDate')}
                  onBlur={handleBlur('expiryDate')}
                  placeholder="Exp. Date"
                  errorMessage={error('expiryDate')}
                  keyboardType="numeric"
                />

                <Input
                  containerStyle={styles.halfWidthInput}
                  label="CVV"
                  value={values.cvv}
                  onChangeText={handleChange('cvv')}
                  onBlur={handleBlur('cvv')}
                  placeholder="CVV"
                  errorMessage={error('cvv')}
                  keyboardType="numeric"
                />
              </View>

              <Image
                source={require('../../../assets/images/powered-by-peach-payments.png')}
                containerStyle={styles.peachPaymentsImage}
              />

              <SafeAreaView>
                <Button onPress={handleSubmit} loading={isSubmitting} title="Complete" />
              </SafeAreaView>
            </>
          );
        }}
      </Formik>
    </View>
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
