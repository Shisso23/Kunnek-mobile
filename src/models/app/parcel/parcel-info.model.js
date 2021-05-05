/* eslint-disable camelcase */
import _ from 'lodash';

export const parcelInfoModel = (_apiParcelInfoModel = {}) => ({
  description: _.get(_apiParcelInfoModel, 'description', ''),
  height: _.get(_apiParcelInfoModel, 'height', ''),
  width: _.get(_apiParcelInfoModel, 'width', ''),
  length: _.get(_apiParcelInfoModel, 'length', ''),
  weight: _.get(_apiParcelInfoModel, 'weight', ''),
  offerAmount: _.get(_apiParcelInfoModel, 'offer_amount', ''),
  imageUri: _.get(_apiParcelInfoModel, 'image', ''),
});

export const apiUserModel = (_appUserModel = {}) => ({
  user: {
    email: _.get(_appUserModel, 'email', ''),
    name: _.get(_appUserModel, 'name', ''),
  },
});
