/* eslint-disable camelcase */
import _ from 'lodash';

export const forgotPasswordModel = (_apiForgotPasswordModel = {}) => ({
  mobileNumber: _.get(_apiForgotPasswordModel, 'mobile_number', ''),
});

export const apiForgotPasswordModel = (_appForgotPasswordModel = {}) => ({
  user: {
    mobile_number: _.get(_appForgotPasswordModel, 'mobileNumber', ''),
  },
});
