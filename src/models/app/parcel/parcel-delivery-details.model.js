/* eslint-disable camelcase */
import _ from 'lodash';

export const parcelDeliveryInfoModel = (_apiParcelInfoModel = {}) => ({
  pickUpAddress: _.get(_apiParcelInfoModel, 'pick_up_address', ''),
  dropOffAddress: _.get(_apiParcelInfoModel, 'drop_off_address', ''),
  latestDeliveryDate: _.get(_apiParcelInfoModel, 'latest_delivery_date', ''),
  receiverFirstName: _.get(_apiParcelInfoModel, 'receivers_first_name', ''),
  receiverLastName: _.get(_apiParcelInfoModel, 'receivers_last_name', ''),
  receiverMobileNumber: _.get(_apiParcelInfoModel, 'receivers_mobile_number', ''),
});

export const apiUserModel = (_appUserModel = {}) => ({
  user: {
    email: _.get(_appUserModel, 'email', ''),
    name: _.get(_appUserModel, 'name', ''),
  },
});
