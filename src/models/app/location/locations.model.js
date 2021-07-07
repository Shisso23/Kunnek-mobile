import _ from 'lodash';

export const locationsModel = (_apiLocationableModel) =>
  _.get(_apiLocationableModel, 'locations', []).map((_location) => ({
    latitude: _.get(_location, 'latitude', 0.0),
    longitude: _.get(_location, 'longitude', 0.0),
    type: _.get(_location, 'location_type', ''),
  }));

export const apiLocationsModel = (_appLocationableModel = {}) =>
  _.get(_appLocationableModel, 'locations', []).map((_location) => ({
    latitude: _.get(_location, 'latitude', 0.0),
    longitude: _.get(_location, 'longitude', 0.0),
    location_type: _.get(_location, 'type', ''),
  }));

export const apiTripLocationsModel = (_appLocationableModel = {}) => [
  { address: _.get(_appLocationableModel, 'pickUpAddress'), location_type: 'start' },
  { address: _.get(_appLocationableModel, 'dropOffAddress'), location_type: 'end' },
];
