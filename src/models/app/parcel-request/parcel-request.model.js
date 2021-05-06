/* eslint-disable camelcase */
import _ from 'lodash';

export const parcelRequestModel = (_apiParcelRequestModel = {}) => ({
  id: _.get(_apiParcelRequestModel, 'id', ''),
  pickUpAddress: _.get(_apiParcelRequestModel, 'collect_address', ''),
  dropOffAddress: _.get(_apiParcelRequestModel, 'deliver_address', ''),
  description: _.get(_apiParcelRequestModel, 'description', ''),
  price: _.get(_apiParcelRequestModel, 'price', 0.0),
  distance: _.get(_apiParcelRequestModel, 'distance', 0.0),
  itemWeight: _.get(_apiParcelRequestModel, 'item_weight', 0.0),
  itemHeight: _.get(_apiParcelRequestModel, 'item_height', 0.0),
  itemWidth: _.get(_apiParcelRequestModel, 'item_width', 0.0),
  itemLength: _.get(_apiParcelRequestModel, 'item_length', 0.0),
  pickupDateTime: _.get(_apiParcelRequestModel, 'pickup_date_time', ''),
  latestDeliveryDateTime: _.get(_apiParcelRequestModel, 'latest_delivery_date_time', ''),
  locations: _.get(_apiParcelRequestModel, 'locations', []),
  serviceFee: _.get(_apiParcelRequestModel, 'service_fee', 0),
  photoUri: _.get(_apiParcelRequestModel, 'photo', ''),
  receiverFirstName: _.get(_apiParcelRequestModel, 'receiver.first_name', ''),
  receiverLastName: _.get(_apiParcelRequestModel, 'receiver.last_name', ''),
  receiverMobileNumber: _.get(_apiParcelRequestModel, 'receiver.mobile_number', ''),
  senderId: _.get(_apiParcelRequestModel, 'sender_id', 0),
});

export const apiParcelRequestModel = (_appParcelRequestModel = {}) => ({
  job: {
    id: _.get(_appParcelRequestModel, 'id', ''),
    description: _.get(_appParcelRequestModel, 'description', ''),
    price: _.get(_appParcelRequestModel, 'price', 0.0),
    distance: _.get(_appParcelRequestModel, 'distance', 0.0),
    item_weight: _.get(_appParcelRequestModel, 'itemWeight', 0.0),
    item_height: _.get(_appParcelRequestModel, 'itemHeight', 0.0),
    item_width: _.get(_appParcelRequestModel, 'itemWidth', 0.0),
    item_length: _.get(_appParcelRequestModel, 'itemLength', 0.0),
    pickup_date_time: _.get(_appParcelRequestModel, 'pickupDateTime', ''),
    latest_delivery_date_time: _.get(_appParcelRequestModel, 'latestDeliveryDateTime', ''),
    locations: [
      { location_type: 'collect', address: _.get(_appParcelRequestModel, 'pickUpAddress', '') },
      { location_type: 'deliver', address: _.get(_appParcelRequestModel, 'dropOffAddress', '') },
    ],
    service_fee: _.get(_appParcelRequestModel, 'serviceFee', 0),
    photo: {
      uri: _.get(_appParcelRequestModel, 'photoUri', ''),
      name: 'photo',
      type: 'image/jpeg',
    },
    sender_id: _.get(_appParcelRequestModel, 'senderId', 0),
    receiver: {
      first_name: _.get(_appParcelRequestModel, 'receiverFirstName', ''),
      last_name: _.get(_appParcelRequestModel, 'receiverLastName', ''),
      mobile_number: _.get(_appParcelRequestModel, 'receiverMobileNumber', ''),
    },
  },
});
