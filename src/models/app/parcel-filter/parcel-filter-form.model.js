import _ from 'lodash';

export const filtersFormModel = (filterModal = {}) => ({
  startLocation: _.get(filterModal, 'startLocation', ''),
  endLocation: _.get(filterModal, 'endLocation', ''),
  maximumDistance: _.get(filterModal, 'maximumDistance', 0),
  lastDeliveryDate: _.get(filterModal, 'lastDeliveryDate', ''),
});

export const filtersFormModelApi = (filterModal = {}) => {
  const empyFields = _.filter(Object.keys(filterModal), (key) => {
    return `${filterModal[`${key}`]}` === '0' || `${filterModal[`${key}`]}`.length === 0;
  });
  return _.unset(
    {
      start_point: _.get(filterModal, 'startLocation', ''),
      end_point: _.get(filterModal, 'endLocation', ''),
      max_distance_deviation: _.get(filterModal, 'maximumDistance', 0),
      latest_delivery_date: _.get(filterModal, 'lastDeliveryDate', ''),
    },
    empyFields,
  );
};
