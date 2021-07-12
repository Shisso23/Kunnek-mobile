import React from 'react';
import _ from 'lodash';
import { SafeAreaView, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button, Input } from 'react-native-elements';

import {
  emailSchema,
  registerPasswordSchema,
  confirmPasswordSchema,
  termsAndConditionsSchema,
  profilePictureSchema,
  twoFactorAuthSchema,
} from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { CustomCheckbox, TermsAndConditions } from '../../atoms';
import { flashService } from '../../../services';
import { UploadDocumentButton } from '../../molecules';
import ProfilePicture from '../../atoms/profile-picture';
import { useTheme } from '../../../theme';

const UserInfoForm = ({ edit, submitForm, onSuccess, initialValues, containerStyle }) => {
  const { Layout } = useTheme();
  const validationSchema = Yup.object().shape({
    email: emailSchema,
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    mobileNumber: Yup.string().required('Mobile number is required'),
    idNumber: Yup.string().required('Id is required'),
    password: registerPasswordSchema(edit),
    confirmPassword: confirmPasswordSchema(edit),
    termsAndConditions: termsAndConditionsSchema(edit),
    ProfilePicture: profilePictureSchema(edit),
    useTwoFactorAuth: twoFactorAuthSchema(edit),
  });

  const _handleSubmission = (formData, actions) => {
    if (edit) {
      const currentProfilePicture = _.get(initialValues, 'profilePictureUri');
      const newProfilePicture = _.get(formData, 'profilePictureUri');
      if (currentProfilePicture === newProfilePicture) delete formData.profilePictureUri;
    }

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
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                placeholder="First Name"
                errorMessage={error('firstName')}
              />

              <Input
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                placeholder="Last Name"
                errorMessage={error('lastName')}
              />

              <Input
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Email"
                errorMessage={error('email')}
                keyboardType="email-address"
              />

              <Input
                value={values.idNumber}
                onChangeText={handleChange('idNumber')}
                onBlur={handleBlur('idNumber')}
                placeholder="Id Number"
                errorMessage={error('idNumber')}
                keyboardType="numeric"
              />

              <Input
                value={values.mobileNumber}
                onChangeText={handleChange('mobileNumber')}
                onBlur={handleBlur('mobileNumber')}
                placeholder="Mobile Number"
                errorMessage={error('mobileNumber')}
                keyboardType="email-address"
              />
              {edit && (
                <>
                  <CustomCheckbox
                    onPress={() => {
                      setFieldValue('useTwoFactorAuth', !values.useTwoFactorAuth);
                    }}
                    checked={values.useTwoFactorAuth}
                    text="Two factor authentication"
                  />
                  <View style={Layout.alignSelfCenter}>
                    <ProfilePicture user={values} />
                  </View>
                  <UploadDocumentButton
                    label=""
                    errorMessage={error('profilePictureUri')}
                    onImageSelect={handleChange('profilePictureUri')}
                  />
                </>
              )}

              {!edit && (
                <>
                  <Input
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="Password"
                    secureTextEntry
                    onBlur={handleBlur('password')}
                    errorMessage={error('password')}
                  />

                  <Input
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    placeholder="Confirm Password"
                    secureTextEntry
                    onBlur={handleBlur('confirmPassword')}
                    errorMessage={error('confirmPassword')}
                  />
                </>
              )}
              {!edit && (
                <TermsAndConditions
                  checked={values.termsAndConditions}
                  onPress={() => setFieldValue('termsAndConditions', !values.termsAndConditions)}
                />
              )}
              <SafeAreaView>
                <Button
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  title={!edit ? 'Sign Up' : 'Update'}
                />
              </SafeAreaView>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

UserInfoForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  edit: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
};

UserInfoForm.defaultProps = {
  onSuccess: () => null,
  edit: false,
  containerStyle: {},
};

export default UserInfoForm;
