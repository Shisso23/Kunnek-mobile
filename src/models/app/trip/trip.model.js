import _ from 'lodash';
import { apiLocationsModel, locationsModel } from '../location/locations.model';

export const tripModel = (_apiTripModel = {}) => ({
  id: _.get(_apiTripModel, 'id', ''),
  latestArrivalDateTime: _.get(_apiTripModel, 'latest_arrival_date_time', ''),
  collectorId: _.get(_apiTripModel, 'collector_id', ''),
  distance: _.get(_apiTripModel, 'distance', 0),
  startAddress: _.get(_apiTripModel, 'start_address', ''),
  endAddress: _.get(_apiTripModel, 'end_address', 0.0),
  locations: locationsModel(_apiTripModel),
});

export const apiTripModel = (_appTripModel = {}) => ({
  job: {
    id: _.get(_appTripModel, 'id', ''),
    latest_arrival_date_time: _.get(_appTripModel, 'latestArrivalDateTime', ''),
    collector_id: _.get(_appTripModel, 'collectorId', ''),
    distance: _.get(_appTripModel, 'distance', ''),
    start_address: _.get(_appTripModel, 'startAddress', ''),
    end_address: _.get(_appTripModel, 'endAddress', 0.0),
    locations: apiLocationsModel(_appTripModel),
  },
});
