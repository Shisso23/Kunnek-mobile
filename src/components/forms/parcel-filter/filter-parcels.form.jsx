import React, { useState } from 'react';
import _ from 'lodash';
import { SafeAreaView, ViewPropTypes, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button, Input, Text } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/Variables';
import AddressInput from '../../molecules/address-input';

const FilterParcels = ({ submitForm, onSuccess, initialValues }) => {
  const validationSchema = Yup.object().shape({
    startLocation: Yup.string(),
    endLocation: Yup.string(),
    maximumDistance: Yup.number().positive(),
    lastDeliveryDate: Yup.string(),
  });

  const { Custom } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then((response) => {
        actions.setSubmitting(false);
        console.log('response', response);
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
        setFieldValue,
        handleBlur,
        touched,
        status,
      }) => {
        const error = (name) => getFormError(name, { touched, status, errors });
        return (
          <>
            <Text style={[Custom.headerTitleStyle, styles.headerText]}>Filters</Text>
            <AddressInput
              value={values.startLocation}
              onChange={handleChange('startLocation')}
              placeholder="Start Location"
              errorMessage={error('startLocation')}
            />

            <AddressInput
              value={values.endLocation}
              onChange={handleChange('endLocation')}
              placeholder="End Location"
              errorMessage={error('endLocation')}
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

            <View>
              <Input
                value={`${values.lastDeliveryDate}`}
                label="Latest Delivery Date"
                onChangeText={handleChange('lastDeliveryDate')}
                onEndEditing={() => setShowDatePicker(false)}
                placeholder="YYYY-MM-D HH:MM"
                errorMessage={error('lastDeliveryDate')}
                onFocus={() => setShowDatePicker(true)}
                rightIcon={<Icon name="calendar-alt" size={25} color={Colors.primary} />}
              />
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  is24Hour={true}
                  mode="datetime"
                  display="default"
                  onChange={(event, date) => {
                    setFieldValue(
                      'lastDeliveryDate',
                      `${moment(date).format('D MMMM YYYY, h:mm')}`,
                    );
                  }}
                  onTouchEnd={() => setShowDatePicker(false)}
                />
              )}
            </View>

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
