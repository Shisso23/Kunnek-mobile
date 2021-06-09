import _ from 'lodash';

export const filtersFormModel = (filterModal = {}) => ({
  startLocation: _.get(filterModal, 'startLocation', 0.0),
  endLocation: _.get(filterModal, 'endLocation', 0.0),
  maximumDistance: _.get(filterModal, 'maximumDistance', 0.0),
  lastDeliveryDate: _.get(filterModal, 'lastDeliveryDate', new Date()),
});

export const filtersFormModelApi = (filterModal = {}) => ({ filterModal });
