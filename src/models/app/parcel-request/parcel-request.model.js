import _ from 'lodash';
import { locationsModel } from '../location/locations.model';
import { delivererModel, senderModel } from './sender-deliverer.model';

export const parcelRequestModel = (_apiParcelRequestModel = {}) => ({
  id: _.get(_apiParcelRequestModel, 'id', ''),
  pickUpAddress: _.get(_apiParcelRequestModel, 'collect_address', ''),
  dropOffAddress: _.get(_apiParcelRequestModel, 'deliver_address', ''),
  abbreviatedPickUpAddress: _.get(_apiParcelRequestModel, 'abbreviated_collect_address', ''),
  abbreviatedDropOffAddress: _.get(_apiParcelRequestModel, 'abbreviated_deliver_address', ''),
  description: _.get(_apiParcelRequestModel, 'description', ''),
  price: _.get(_apiParcelRequestModel, 'price', 0.0),
  distance: _.get(_apiParcelRequestModel, 'distance', 0.0),
  itemWeight: _.get(_apiParcelRequestModel, 'item_weight', 0.0),
  itemHeight: _.get(_apiParcelRequestModel, 'item_height', 0.0),
  itemWidth: _.get(_apiParcelRequestModel, 'item_width', 0.0),
  itemLength: _.get(_apiParcelRequestModel, 'item_length', 0.0),
  pickupDateTime: _.get(_apiParcelRequestModel, 'pickup_date_time', ''),
  latestDeliveryDateTime: _.get(_apiParcelRequestModel, 'latest_delivery_date_time', ''),
  locations: locationsModel(_apiParcelRequestModel),
  serviceFee: _.get(_apiParcelRequestModel, 'service_fee', 0),
  photoUri: _.get(_apiParcelRequestModel, 'photo', ''),
  receiverFirstName: _.get(_apiParcelRequestModel, 'receiver.first_name', ''),
  receiverLastName: _.get(_apiParcelRequestModel, 'receiver.last_name', ''),
  receiverMobileNumber: _.get(_apiParcelRequestModel, 'receiver.mobile_number', ''),
  senderId: _.get(_apiParcelRequestModel, 'sender_id', 0),
  status: _.get(_apiParcelRequestModel, 'status', 'In Progress'),
  sender: senderModel(_.get(_apiParcelRequestModel, 'sender', {})),
  deliverer: delivererModel(_.get(_apiParcelRequestModel, 'collector', {})),
  reviewedBySender: _.get(_apiParcelRequestModel, 'reviewed_by_sender', false),
  reviewedByDeliverer: _.get(_apiParcelRequestModel, 'reviewed_by_driver', false),
});

export const apiParcelRequestModel = (_appParcelRequestModel = {}) => {
  const data = {
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
      locations_attributes: [
        { location_type: 'collect', address: _.get(_appParcelRequestModel, 'pickUpAddress', '') },
        { location_type: 'deliver', address: _.get(_appParcelRequestModel, 'dropOffAddress', '') },
      ],
      service_fee: _.get(_appParcelRequestModel, 'serviceFee', 0),
      sender_id: _.get(_appParcelRequestModel, 'senderId', 0),
      status: _.get(_appParcelRequestModel, 'status', ''),
      receiver_attributes: {
        first_name: _.get(_appParcelRequestModel, 'receiverFirstName', ''),
        last_name: _.get(_appParcelRequestModel, 'receiverLastName', ''),
        mobile_number: _.get(_appParcelRequestModel, 'receiverMobileNumber', ''),
      },
    },
  };
  const photoUri = _.get(_appParcelRequestModel, 'photoUri', '');
  if (!_.isEmpty(photoUri)) {
    data.job.photo = {
      uri: photoUri,
      name: 'photo',
      type: 'image/jpeg',
    };
  }
  return data;
};

export const apiParcelRequestUpdateModel = (_appParcelRequestModel = {}) => {
  const data = {
    job: {
      description: _.get(_appParcelRequestModel, 'description', ''),
      price: _.get(_appParcelRequestModel, 'price', 0.0),
      item_weight: _.get(_appParcelRequestModel, 'itemWeight', 0.0),
      item_height: _.get(_appParcelRequestModel, 'itemHeight', 0.0),
      item_width: _.get(_appParcelRequestModel, 'itemWidth', 0.0),
      item_length: _.get(_appParcelRequestModel, 'itemLength', 0.0),
      latest_delivery_date_time: _.get(_appParcelRequestModel, 'latestDeliveryDateTime', ''),
      locations_attributes: [
        { location_type: 'collect', address: _.get(_appParcelRequestModel, 'pickUpAddress', '') },
        { location_type: 'deliver', address: _.get(_appParcelRequestModel, 'dropOffAddress', '') },
      ],
      receiver_attributes: {
        first_name: _.get(_appParcelRequestModel, 'receiverFirstName', ''),
        last_name: _.get(_appParcelRequestModel, 'receiverLastName', ''),
        mobile_number: _.get(_appParcelRequestModel, 'receiverMobileNumber', ''),
      },
    },
  };
  const photoUri = _.get(_appParcelRequestModel, 'photoUri', '');
  if (!_.isEmpty(photoUri)) {
    data.job.photo = {
      uri: photoUri,
      name: 'photo',
      type: 'image/jpeg',
    };
  }

  return data;
};

export const apiParcelStatusUpdateModel = (_appParcelStatusUpdateModel = {}) => {
  if (_.get(_appParcelStatusUpdateModel, 'nextStatus', false)) {
    return {
      job: {
        next_status: _.get(_appParcelStatusUpdateModel, 'nextStatus'),
      },
    };
  } else {
    return {
      job: {
        pickup_date_time: _.get(_appParcelStatusUpdateModel, 'latestArrivalDateTime'),
        collector_id: _.get(_appParcelStatusUpdateModel, 'collectorId'),
        trip_id: _.get(_appParcelStatusUpdateModel, 'id'),
        next_status: 'pending_acceptance_from_sender',
      },
    };
  }
};

export const apiParcelStatusCancelModel = (_appParcelStatusCancelModel = {}) => {
  const data = {
    job: {
      status: _.get(_appParcelStatusCancelModel, 'status'),
      next_status: 'pending',
      trip_id: null,
      collector_id: null,
    },
  };
  return data;
};
