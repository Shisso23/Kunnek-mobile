import React, { useState } from 'react';
import _ from 'lodash';
import { SafeAreaView, ViewPropTypes, StyleSheet, TouchableOpacity } from 'react-native';
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
import { Colors, FontSize } from '../../../theme/Variables';
import AddressInput from '../../molecules/address-input';
import theme from '../../../theme/react-native-elements-theme';
import InputWrapper from '../../molecules/input-wrapper';

const FilterParcels = ({ submitForm, onSuccess, initialValues, clearInitialFormValues }) => {
  const validationSchema = Yup.object().shape({
    startLocation: Yup.string(),
    endLocation: Yup.string(),
    maximumDistance: Yup.number(),
    lastDeliveryDate: Yup.string(),
  });

  const { Custom, Common, Layout, Gutters } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
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
        setFieldValue,
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
            <InputWrapper
              label="Latest Delivery Date"
              errorMessage={error('lastDeliveryDate')}
              containerStyle={[theme.Input.containerStyle, styles.containerStyle]}
            >
              <Button
                onPress={() => setShowDatePicker(true)}
                title={`${values.lastDeliveryDate}`}
                buttonStyle={[
                  theme.Input.inputStyle,
                  Gutters.smallLPadding,
                  Gutters.regularTPadding,
                  Layout.alignItemsStart,
                  Gutters.smallVPadding,
                  Layout.fullWidth,
                  Layout.alignSelfStart,
                ]}
                icon={
                  <Icon
                    name="calendar-alt"
                    size={25}
                    color={Colors.primary}
                    style={[styles.calendarIcon, Layout.alignSelfCenter]}
                  />
                }
                iconRight
                containerStyle={[theme.Input.inputContainerStyle]}
                titleStyle={[Custom.buttonTextInput, styles.texts]}
              />
            </InputWrapper>

            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={
                  values.lastDeliveryDate.length === 0
                    ? new Date(`${moment(new Date()).format('D MMMM YYYY, h:mm')}`)
                    : new Date(values.lastDeliveryDate)
                }
                is24Hour={true}
                mode="datetime"
                display="default"
                onChange={(event, date) => {
                  setFieldValue('lastDeliveryDate', `${moment(date).format('D MMMM YYYY, h:mm')}`);
                }}
                onTouchEnd={() => setShowDatePicker(false)}
                style={[Gutters.tinyLMargin]}
                minimumDate={new Date()}
              />
            )}

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
  calendarIcon: { left: 10, position: 'absolute' },
  clearButton: {
    alignSelf: 'flex-end',
    borderRadius: 10,
    borderWidth: 0.3,
  },
  clearText: { color: Colors.primary, fontWeight: 'bold' },
  containerStyle: { backgroundColor: Colors.white, marginTop: -13 },
  texts: { color: Colors.darkGrey, fontSize: FontSize.regular },
});
