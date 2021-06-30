import _ from 'lodash';

export const itemDetailsFormModel = (_parcelRequestModel = {}) => ({
  description: _.get(_parcelRequestModel, 'description', ''),
  itemWeight: _.get(_parcelRequestModel, 'itemWeight', ''),
  itemHeight: _.get(_parcelRequestModel, 'itemHeight', ''),
  itemWidth: _.get(_parcelRequestModel, 'itemWidth', ''),
  itemLength: _.get(_parcelRequestModel, 'itemLength', ''),
  price: _.get(_parcelRequestModel, 'price', '').toString(),
  photoUri: _.get(_parcelRequestModel, 'photoUri', ''),
});

export const deliveryAndReceiverDetailsFormModel = (_parcelRequestModel = {}) => ({
  pickUpAddress: _.get(_parcelRequestModel, 'pickUpAddress', ''),
  dropOffAddress: _.get(_parcelRequestModel, 'dropOffAddress', ''),
  latestDeliveryDateTime: _.get(_parcelRequestModel, 'latestDeliveryDateTime', ''),
  receiverFirstName: _.get(_parcelRequestModel, 'receiverFirstName', ''),
  receiverLastName: _.get(_parcelRequestModel, 'receiverLastName', ''),
  receiverMobileNumber: _.get(_parcelRequestModel, 'receiverMobileNumber', ''),
});
