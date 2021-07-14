import React, { useState } from 'react';
import _ from 'lodash';
import { SafeAreaView, ViewPropTypes, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Text } from 'react-native-elements';

import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/Variables';
import AddressInput from '../../molecules/address-input';
import theme from '../../../theme/react-native-elements-theme';
import DateTimeInput from '../../molecules/date-time-input';

const FilterParcels = ({ submitForm, onSuccess, initialValues, clearInitialFormValues }) => {
  const validationSchema = Yup.object().shape({
    startLocation: Yup.string(),
    endLocation: Yup.string(),
    maximumDistance: Yup.number(),
    lastDeliveryDate: Yup.string(),
  });

  const { Custom, Common, Gutters } = useTheme();
  const [formReseted, setFormReseted] = useState(false);

  const resetFormData = (resetForm) => {
    clearInitialFormValues();
    resetForm();
    setFormReseted(true);
  };

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        onSuccess();
      })
      .catch((error) => {
        actions.setSubmitting(false);
        flashService.error('Form Submission Error');
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
        resetForm,
      }) => {
        const error = (name) => getFormError(name, { touched, status, errors });
        return (
          <>
            <Text
              style={[
                Custom.headerTitleStyle,
                Gutters.regularBMargin,
                Gutters.tinyLMargin,
                Custom.headerTitle,
              ]}
            >
              Filters
            </Text>
            <AddressInput
              value={values.startLocation}
              onChange={handleChange('startLocation')}
              placeholder="Start Location"
              errorMessage={error('startLocation')}
              reseted={formReseted}
            />

            <AddressInput
              value={values.endLocation}
              onChange={handleChange('endLocation')}
              placeholder="End Location"
              errorMessage={error('endLocation')}
              reseted={formReseted}
            />

            <Input
              value={`${values.maximumDistance}`}
              label="Maximum Distance Deviation (km's)"
              onChangeText={handleChange('maximumDistance')}
              onBlur={handleBlur('maximumDistance')}
              errorMessage={error('maximumDistance')}
              keyboardType="number-pad"
              labelStyle={Gutters.regularBPadding}
            />
            <DateTimeInput
              value={values.lastDeliveryDate}
              onChange={handleChange('lastDeliveryDate')}
              onBlur={handleBlur('lastDeliveryDate')}
              placeholder="Latest Date of Collection"
              errorMessage={error('lastDeliveryDate')}
              label="Latest Delivery Date"
              mode="datetime"
              format="YYYY-MM-DD HH:mm"
              containerStyle={[theme.Input.containerStyle, styles.containerStyle]}
            />
            <SafeAreaView>
              <Button onPress={handleSubmit} loading={isSubmitting} title="Search" />
              <TouchableOpacity
                onPress={() => resetFormData(resetForm)}
                style={[Gutters.tinyPadding, styles.clearButton]}
              >
                <Text style={[Common.smallText, Gutters.tinyPadding, styles.clearText]}>
                  Clear form
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          </>
        );
      }}
    </Formik>
  );
};

FilterParcels.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  clearInitialFormValues: PropTypes.func.isRequired,
};

FilterParcels.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
};

export default FilterParcels;

const styles = StyleSheet.create({
  clearButton: {
    alignSelf: 'center',
  },
  clearText: { color: Colors.primary, fontWeight: 'bold' },
  containerStyle: { backgroundColor: Colors.white, marginTop: -13 },
});
