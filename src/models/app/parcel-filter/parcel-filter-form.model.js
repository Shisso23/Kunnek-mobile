import _ from 'lodash';

export const filtersFormModel = (filterModal = {}) => ({
  startLocation: _.get(filterModal, 'startLocation', ''),
  endLocation: _.get(filterModal, 'endLocation', ''),
  maximumDistance: _.get(filterModal, 'maximumDistance', 0),
  lastDeliveryDate: _.get(filterModal, 'lastDeliveryDate', ''),
});

export const apiFiltersFormModel = (filterModal = {}) => {
  const nonEmptyFields = _.filter(Object.keys(filterModal), (key) => {
    return `${filterModal[`${key}`]}`.length > 0 && `${filterModal[`${key}`]}` !== '0';
  });

  let apiModel = {
    start_point: _.get(filterModal, 'startLocation', ''),
    end_point: _.get(filterModal, 'endLocation', ''),
    max_distance_deviation: _.get(filterModal, 'maximumDistance', 0),
    latest_delivery_date: _.get(filterModal, 'lastDeliveryDate', ''),
  };
  apiModel = _.reduce(
    nonEmptyFields,
    (finalObject, field) => {
      finalObject[`${field}`] = `${filterModal[field]}`;
      return finalObject;
    },
    {},
  );
  return apiModel;
};
