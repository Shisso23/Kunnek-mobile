import _ from 'lodash';

export const itemDetailsFormModel = (_parcelRequestModel = {}) => ({
  description: _.get(_parcelRequestModel, 'description', ''),
  itemWeight: _.get(_parcelRequestModel, 'itemWeight', 0.0),
  itemHeight: _.get(_parcelRequestModel, 'itemHeight', 0.0),
  itemWidth: _.get(_parcelRequestModel, 'itemWidth', 0.0),
  itemLength: _.get(_parcelRequestModel, 'itemLength', 0.0),
  price: _.get(_parcelRequestModel, 'price', undefined),
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
