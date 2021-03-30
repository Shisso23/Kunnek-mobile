/* eslint-disable camelcase */
import _ from 'lodash';

export const parcelRequestModel = (_apiParcelRequestModel = {}) => ({
  id: _.get(_apiParcelRequestModel, 'id', ''),
  collectAddress: _.get(_apiParcelRequestModel, 'collect_address', ''),
  deliverAddress: _.get(_apiParcelRequestModel, 'deliver_address', ''),
  itemName: _.get(_apiParcelRequestModel, 'item_name', ''),
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
});

export const apiParcelRequestModel = (_appParcelRequestModel = {}) => ({
  job: {
    id: _.get(_appParcelRequestModel, 'id', ''),
    collect_address: _.get(_appParcelRequestModel, 'collectAddress', ''),
    deliver_address: _.get(_appParcelRequestModel, 'deliverAddress', ''),
    item_name: _.get(_appParcelRequestModel, 'itemName', ''),
    description: _.get(_appParcelRequestModel, 'description', ''),
    price: _.get(_appParcelRequestModel, 'price', 0.0),
    distance: _.get(_appParcelRequestModel, 'distance', 0.0),
    item_weight: _.get(_appParcelRequestModel, 'itemWeight', 0.0),
    item_height: _.get(_appParcelRequestModel, 'itemHeight', 0.0),
    item_width: _.get(_appParcelRequestModel, 'itemWidth', 0.0),
    item_length: _.get(_appParcelRequestModel, 'itemLength', 0.0),
    pickup_date_time: _.get(_appParcelRequestModel, 'pickupDateTime', ''),
    latest_delivery_date_time: _.get(_appParcelRequestModel, 'latestDeliveryDateTime', ''),
    locations: _.get(_appParcelRequestModel, 'locations', []),
    service_fee: _.get(_appParcelRequestModel, 'serviceFee', 0),
  },
});
