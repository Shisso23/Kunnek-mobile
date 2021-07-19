import _ from 'lodash';
import { getCloseOfBusiness } from '../../../helpers/date.helper';

export const filtersFormModel = (filterModal = {}) => ({
  startLocation: _.get(filterModal, 'startLocation', ''),
  endLocation: _.get(filterModal, 'endLocation', ''),
  maximumDistance: _.get(filterModal, 'maximumDistance', 50),
  lastDeliveryDate: _.get(filterModal, 'lastDeliveryDate', getCloseOfBusiness()),
});

export const apiFiltersFormModel = (filterModal = {}) => {
  let apiModel = {
    start_point: _.get(filterModal, 'startLocation', ''),
    end_point: _.get(filterModal, 'endLocation', ''),
    max_distance_deviation:
      _.get(filterModal, 'maximumDistance', 0) === 0
        ? 50
        : _.get(filterModal, 'maximumDistance', 0),
    latest_delivery_date: _.get(filterModal, 'lastDeliveryDate', ''),
  };
  const nonEmptyFields = _.filter(Object.keys(apiModel), (key) => {
    return `${apiModel[`${key}`]}`.length > 0 && `${apiModel[`${key}`]}` !== '0';
  });

  apiModel = _.reduce(
    nonEmptyFields,
    (finalObject, field) => {
      finalObject[`${field}`] = `${apiModel[field]}`;
      return finalObject;
    },
    {},
  );
  return apiModel;
};
