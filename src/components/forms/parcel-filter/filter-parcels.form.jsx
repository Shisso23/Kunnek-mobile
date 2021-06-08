import React, { useState } from 'react';
import _ from 'lodash';
import { SafeAreaView, TouchableOpacity, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button, Input, Text } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/Variables';

const FilterParcels = ({ submitForm, onSuccess, initialValues }) => {
  const validationSchema = Yup.object().shape({
    startLocation: Yup.string().required('Start location is required'),
    endLocation: Yup.number().required('End location is required').positive(),
    maximumDistance: Yup.number().required('Maximum distance is required').positive(),
    lastDeliveryDate: Yup.date().required('Last delivery date is required'),
  });

  const { Custom, Layout } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);

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
            <TouchableOpacity style={[Custom.closeButton, Layout.alignSelfEnd]}>
              <Icon name="times-circle" size={25} />
            </TouchableOpacity>
            <Text style={[Custom.headerTitleStyle, styles.headerText]}>Filters</Text>
            <Input
              value={values.startLocation}
              label="Start Location"
              onChangeText={handleChange('startLocation')}
              onBlur={handleBlur('startLocation')}
              placeholder="0"
              errorMessage={error('startLocation')}
              keyboardType="number-pad"
            />

            <Input
              value={values.endLocation}
              label="End Location"
              onChangeText={handleChange('endLocation')}
              onBlur={handleBlur('endLocation')}
              placeholder="0"
              errorMessage={error('endLocation')}
              keyboardType="number-pad"
            />

            <Input
              value={values.maximumDistance}
              label="Maximum Distance Deviation (km's)"
              onChangeText={handleChange('maximumDistance')}
              onBlur={handleBlur('maximumDistance')}
              placeholder="0"
              errorMessage={error('maximumDistance')}
              keyboardType="number-pad"
            />

            <Input
              value={values.lastDeliveryDate}
              label="Latest Delivery Date"
              onChangeText={handleChange('lastDeliveryDate')}
              onBlur={handleBlur('lastDeliveryDate')}
              placeholder="YYYY-MM-D HH:MM"
              errorMessage={error('lastDeliveryDate')}
              keyboardType="numeric"
              onFocus={() => setShowDatePicker(true)}
              rightIcon={<Icon name="calendar-alt" size={25} color={Colors.primary} />}
            />
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={values.lastDeliveryDate || new Date()}
                is24Hour={true}
                display="default"
                onChange={handleChange('lastDeliveryDate')}
              />
            )}

            <SafeAreaView>
              <Button onPress={handleSubmit} loading={isSubmitting} title="Search" />
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
};

FilterParcels.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
};

export default FilterParcels;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    marginBottom: 15,
    marginLeft: 6,
  },
});
