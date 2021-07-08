/* eslint-disable camelcase */
import _ from 'lodash';

export const registrationUserModel = (_apiRegistrationsModel = {}) => ({
  firstName: _.get(_apiRegistrationsModel, 'first_name', ''),
  lastName: _.get(_apiRegistrationsModel, 'last_name', ''),
  email: _.get(_apiRegistrationsModel, 'email', ''),
  idNumber: _.get(_apiRegistrationsModel, 'id_number', ''),
  mobileNumber: _.get(_apiRegistrationsModel, 'mobile_number', ''),
  password: _.get(_apiRegistrationsModel, 'password', ''),
  confirmPassword: _.get(_apiRegistrationsModel, 'confirmPassword', ''),
  termsAndConditions: _.get(_apiRegistrationsModel, 'terms_and_conditions', false),
});

export const apiRegistrationUserModel = (_appRegistrationsModel = {}) => {
  const data = {
    user: {
      email: _.get(_appRegistrationsModel, 'email', ''),
      first_name: _.get(_appRegistrationsModel, 'firstName', ''),
      last_name: _.get(_appRegistrationsModel, 'lastName', ''),
      mobile_number: _.get(_appRegistrationsModel, 'mobileNumber', ''),
      id_number: _.get(_appRegistrationsModel, 'idNumber', ''),
      password: _.get(_appRegistrationsModel, 'password', ''),
    },
  };
  const photoUri = _.get(_appRegistrationsModel, 'profilePictureUri', '');
  if (!_.isEmpty(photoUri)) {
    data.user.profile_picture = {
      uri: photoUri,
      name: 'photo',
      type: 'image/jpeg',
    };
  }
  return data;
};
