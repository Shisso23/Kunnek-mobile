import React from 'react';
import _ from 'lodash';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-native-elements';

import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import DateTimeInput from '../../molecules/date-time-input';
import { ListItem, Text } from 'react-native-elements';
import { getCurrency } from '../../../helpers/payment.helper';
import { Colors } from '../../../theme/Variables';
import { DropdownSelect } from '../../molecules';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { useTheme } from '../../../theme';

const DeliverParcelDetailsForm = ({ submitForm, onSuccess, initialValues, parcelRequest }) => {
  const validationSchema = Yup.object().shape({
    latestArrivalDateTime: Yup.date().required('Latest delivery date is required'),
    vehicleId: Yup.string().required('Vehicle is Required'),
  });

  const { user, vehicles } = useSelector(userSelector);
  const { Gutters } = useTheme();
  const vehicleValues = _.map(vehicles, (vehicle) => `${vehicle.make} ${vehicle.model}`);

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
        setFieldValue,
      }) => {
        const error = (name) => getFormError(name, { touched, status, errors });

        const _getVehicle = (id) => {
          const vehicle = _.find(vehicles, (vehicle) => vehicle.id === id);
          return `${_.get(vehicle, 'make', '')} ${_.get(vehicle, 'model', '')}`;
        };

        const _getVehicleRegistration = (id) => {
          const vehicle = _.find(vehicles, (vehicle) => vehicle.id === id);
          return _.get(vehicle, 'registrationNumber');
        };

        const _changeVehicle = (name) => {
          const vehicle = _.find(
            vehicles,
            (vehicle) => `${vehicle.make} ${vehicle.model}` === name,
          );
          setFieldValue('vehicleId', _.get(vehicle, 'id'));
        };
        return (
          <>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>Offer Amount</ListItem.Title>
              </ListItem.Content>
              <Text>
                {getCurrency()}
                {_.get(parcelRequest, 'price')}
              </Text>
            </ListItem>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>Service Fee amount 10%</ListItem.Title>
              </ListItem.Content>
              <Text>
                {getCurrency()}
                {_.get(parcelRequest, 'serviceFee')}
              </Text>
            </ListItem>
            <View style={styles.dividerStyle} />
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>Total Earnings</ListItem.Title>
              </ListItem.Content>
              <Text>
                {getCurrency()}
                {(_.get(parcelRequest, 'price') - _.get(parcelRequest, 'serviceFee')).toFixed(2)}
              </Text>
            </ListItem>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>Identification Number</ListItem.Title>
              </ListItem.Content>
              <Text>{_.get(user, 'idNumber')}</Text>
            </ListItem>
            <Text style={Gutters.regularHMargin}>Car Selection</Text>
            <DropdownSelect
              items={vehicleValues}
              value={_getVehicle(values.vehicleId)}
              valueExtractor={(vehicle) => vehicle}
              keyExtractor={(vehicle, index) => index}
              onChange={_changeVehicle}
              error={error('vehicle')}
            />

            <ListItem>
              <ListItem.Content>
                <ListItem.Title>Car Registration</ListItem.Title>
              </ListItem.Content>
              <Text>{_getVehicleRegistration(values.vehicleId)}</Text>
            </ListItem>
            <Text style={Gutters.regularHMargin}>Specify Pick-Up Date</Text>
            <DateTimeInput
              value={values.latestArrivalDateTime}
              onChange={handleChange('latestArrivalDateTime')}
              onBlur={handleBlur('latestArrivalDateTime')}
              placeholder="Latest Date of Collection"
              errorMessage={error('latestArrivalDateTime')}
              label=""
            />

            <SafeAreaView>
              <Button onPress={handleSubmit} loading={isSubmitting} title="Confirm" />
            </SafeAreaView>
          </>
        );
      }}
    </Formik>
  );
};

DeliverParcelDetailsForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  parcelRequest: PropTypes.object.isRequired,
};

DeliverParcelDetailsForm.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
  createVehicle: false,
};

export default DeliverParcelDetailsForm;

const styles = StyleSheet.create({
  dividerStyle: {
    backgroundColor: Colors.greyShadow,
    width: '95%',
    height: 1,
  },
});
