import _ from 'lodash';

export const filtersFormModel = (filterModal = {}) => ({
  startLocation: _.get(filterModal, 'startLocation', ''),
  endLocation: _.get(filterModal, 'endLocation', ''),
  maximumDistance: _.get(filterModal, 'maximumDistance', 0.0),
  lastDeliveryDate: _.get(filterModal, 'lastDeliveryDate', ''),
});

export const filtersFormModelApi = (filterModal = {}) => ({
  start_point: _.get(filterModal, 'startLocation', ''),
  end_point: _.get(filterModal, 'endLocation', ''),
  max_distance_deviation: _.get(filterModal, 'maximumDistance', 0),
  latest_delivery_date: _.get(filterModal, 'lastDeliveryDate', ''),
});
