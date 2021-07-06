import React from 'react';
import _ from 'lodash';
import { SafeAreaView, StyleSheet, Text, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Image, Input } from 'react-native-elements';

import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector } from '../../../reducers/app-reducer/app.reducer';
import { useEffect } from 'react';
import { getBankNames } from '../../../reducers/app-reducer/app.actions';
import { DropdownSelect } from '../../molecules';
import { useTheme } from '../../../theme';

const BankAccountForm = ({ submitForm, onSuccess, initialValues }) => {
  const { banks } = useSelector(appSelector);
  const bankValues = _.map(banks, (bank) => _.get(bank, 'name'));
  const { Gutters } = useTheme();
  const accountTypes = ['Cheque', 'Current', 'Savings'];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBankNames());
  }, []);

  const validationSchema = Yup.object().shape({
    accountNumber: Yup.string().required('Your bank account number'),
    accountType: Yup.string()
      .oneOf(['Cheque', 'Current', 'Savings'])
      .required('Is this a cheque/current or savings account'),
    collectorId: Yup.string(),
    bankId: Yup.string().required('Bank is required'),
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
        setFieldValue,
      }) => {
        const error = (name) => getFormError(name, { touched, status, errors });
        const _getBank = (id) => {
          const bank = _.find(banks, (bank) => _.get(bank, 'id') === id);
          return _.get(bank, 'name');
        };

        const _changeBank = (name) => {
          const bank = _.find(banks, (bank) => _.get(bank, 'name') === name);
          setFieldValue('bankId', _.get(bank, 'id'));
        };

        return (
          <>
            <Input
              value={values.accountNumber}
              label="Account Number"
              onChangeText={handleChange('accountNumber')}
              onBlur={handleBlur('accountNumber')}
              placeholder="Bank account number"
              errorMessage={error('accountNumber')}
              keyboardType="number-pad"
            />

            <Text style={Gutters.regularHMargin}>Account Type</Text>
            <DropdownSelect
              items={accountTypes}
              value={values.accountType}
              valueExtractor={(type) => type}
              keyExtractor={(type, index) => `${type}${index}`}
              onChange={handleChange('accountType')}
              error={error('accountType')}
            />

            <Text style={Gutters.regularHMargin}>Bank</Text>
            <DropdownSelect
              items={bankValues}
              value={_getBank(values.bankId)}
              valueExtractor={(bank) => bank}
              keyExtractor={(bank, index) => index}
              onChange={_changeBank}
              error={error('bankId')}
            />

            <Image
              source={require('../../../assets/images/powered-by-peach-payments.png')}
              containerStyle={styles.peachPaymentsImage}
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

BankAccountForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

BankAccountForm.defaultProps = {
  onSuccess: () => null,
  containerStyle: {},
};

export default BankAccountForm;

const styles = StyleSheet.create({
  peachPaymentsImage: {
    height: 100,
    marginHorizontal: 10,
    width: 200,
  },
});
