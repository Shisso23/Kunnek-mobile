/* eslint-disable camelcase */
import _ from 'lodash';

export const signInModel = (_apiSignInModel = {}) => ({
  mobileNumber: _.get(_apiSignInModel, 'mobileNumber', ''),
  password: _.get(_apiSignInModel, 'password', ''),
});

export const apiSignInModel = (_appSignInModel = {}) => ({
  username: _.get(_appSignInModel, 'mobileNumber', ''),
  password: _.get(_appSignInModel, 'password', ''),
});
