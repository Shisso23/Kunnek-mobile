import React from 'react';
import _ from 'lodash';
import { SafeAreaView, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from 'react-native-elements';
import dayjs from 'dayjs';

import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import AddressInput from '../../molecules/address-input';
import DateTimeInput from '../../molecules/date-time-input';

const SendParcelDeliverAndReceiverDetailsForm = ({ submitForm, onSuccess, initialValues }) => {
  const validationSchema = Yup.object().shape({
    pickUpAddress: Yup.string().required('Pick up address is required'),
    dropOffAddress: Yup.string().required('Drop off address is required'),
    latestDeliveryDateTime: Yup.string()
      .test('past-date', 'date cannot be in the past', (dateTime) => {
        return dayjs(dateTime).isAfter(dayjs());
      })
      .required('Latest delivery date is required'),
    receiverFirstName: Yup.string().required("The receiver's first name is required"),
    receiverLastName: Yup.string().required("The receiver's last name is required"),
    receiverMobileNumber: Yup.string()
      .required("The receiver's mobile number is required")
      .matches(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Receiver's Mobile Number needs to be in the following format: 0811111111",
      ),
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
            <AddressInput
              value={values.pickUpAddress}
              onChange={handleChange('pickUpAddress')}
              onBlur={handleBlur('pickUpAddress')}
              placeholder="Pick up Address"
              errorMessage={error('pickUpAddress')}
            />

            <AddressInput
              value={values.dropOffAddress}
              onChange={handleChange('dropOffAddress')}
              onBlur={handleBlur('dropOffAddress')}
              placeholder="Drop Off Address"
              errorMessage={error('pickUpAddress')}
            />

            <DateTimeInput
              value={values.latestDeliveryDateTime || dayjs().format('YYYY-MM-DD:HH:mm')}
              onChange={handleChange('latestDeliveryDateTime')}
              onBlur={handleBlur('latestDeliveryDateTime')}
              placeholder="Latest Date of Delivery"
              errorMessage={error('latestDeliveryDateTime')}
              label="Latest Date of Delivery"
              mode="datetime"
              format="YYYY-MM-DD:HH:mm"
            />

            <Input
              value={values.receiverFirstName}
              label="Receiver's First Name"
              onChangeText={handleChange('receiverFirstName')}
              onBlur={handleBlur('receiverFirstName')}
              placeholder="Receiver's First Name"
              errorMessage={error('receiverFirstName')}
            />

            <Input
              value={values.receiverLastName}
              label="Receiver's Last Name"
              onChangeText={handleChange('receiverLastName')}
              onBlur={handleBlur('receiverLastName')}
              placeholder="Receiver's Last Name"
              errorMessage={error('receiverLastName')}
            />

            <Input
              value={values.receiverMobileNumber}
              label="Receiver's Mobile Number"
              onChangeText={handleChange('receiverMobileNumber')}
              onBlur={handleBlur('receiverMobileNumber')}
              placeholder="Receiver's Mobile Number"
              errorMessage={error('receiverMobileNumber')}
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

SendParcelDeliverAndReceiverDetailsForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

SendParcelDeliverAndReceiverDetailsForm.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
};

export default SendParcelDeliverAndReceiverDetailsForm;
