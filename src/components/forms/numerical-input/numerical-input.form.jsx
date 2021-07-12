import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from 'react-native-elements';
import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import { numericSchema } from '../form-validaton-schemas';
import { PaperContainer } from '../../containers';
import { OTPInputField } from '../../molecules';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../theme';

const NumericalInputForm = React.forwardRef(({ submitForm, onSuccess, initialValues }, ref) => {
  const { Gutters } = useTheme();
  const validationSchema = Yup.object().shape({
    numeric: numericSchema,
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
          actions.resetForm({ status: { apiErrors } });
        } else {
          flashService.error(error.message);
          actions.setFieldError('numeric', error.message);
          actions.resetForm();
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
      innerRef={ref}
    >
      {({ handleSubmit, values, errors, isSubmitting, touched, status, setFieldValue }) => {
        const error = (name) => getFormError(name, { touched, status, errors });
        return (
          <PaperContainer>
            <OTPInputField
              length={4}
              value={values.numeric}
              onChange={(newNumeric) => setFieldValue('numeric', newNumeric)}
              error={error('numeric')}
            />
            <Button
              style={[styles.buttonSize, Gutters.regularTMargin, styles.box]}
              onPress={handleSubmit}
              title="Continue"
              loading={isSubmitting}
            />
          </PaperContainer>
        );
      }}
    </Formik>
  );
});

NumericalInputForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
};

NumericalInputForm.defaultProps = {
  onSuccess: () => null,
};

export default NumericalInputForm;

const styles = StyleSheet.create({
  buttonSize: {
    width: '80%',
    alignSelf: 'center',
  },
});
