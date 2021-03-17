/* eslint-disable camelcase */
import _ from 'lodash';

export const registrationUserModel = (_apiRegistrationsModel = {}) => ({
  name: _.get(_apiRegistrationsModel, 'name', ''),
  surname: _.get(_apiRegistrationsModel, 'surname', ''),
  email: _.get(_apiRegistrationsModel, 'email', ''),
  idNumber: _.get(_apiRegistrationsModel, 'id_number', ''),
  mobileNumber: _.get(_apiRegistrationsModel, 'mobile_number', ''),
  password: _.get(_apiRegistrationsModel, 'password', ''),
  confirmPassword: _.get(_apiRegistrationsModel, 'confirmPassword', ''),
  termsAndConditions: _.get(_apiRegistrationsModel, 'terms_and_conditions', false),
});

export const apiRegistrationUserModel = (_appRegistrationsModel = {}) => ({
  user: {
    email: _.get(_appRegistrationsModel, 'email', ''),
    first_name: _.get(_appRegistrationsModel, 'name', ''),
    last_name: _.get(_appRegistrationsModel, 'surname', ''),
    mobile_number: _.get(_appRegistrationsModel, 'mobileNumber', ''),
    id_number: _.get(_appRegistrationsModel, 'idNumber', ''),
    password: _.get(_appRegistrationsModel, 'password', ''),
  },
});
