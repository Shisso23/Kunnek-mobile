import tripUrls from './trip.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import { apiTripModel, tripModel } from '../../../models/app/trip/trip.model';
import _ from 'lodash';
import { getParamString } from '../../../helpers/network.helper';
import { objectToFormData } from '../../../helpers/data.helper';

const getAll = (params) => {
  const url = tripUrls.tripsUrl();
  const _createAndReturnListModel = (apiResponse) =>
    _.map(_.get(apiResponse, 'data.data', []), (item) => tripModel(item));
  return authNetworkService
    .get(`${url}${getParamString(params)}`)
    .then(_createAndReturnListModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const create = (data = {}) => {
  const url = tripUrls.tripsUrl();
  const dataModel = apiTripModel(data);
  const formData = objectToFormData(_.get(dataModel, 'trip', {}), undefined, 'trip');
  const _createAndReturnModel = (apiResponse) => {
    return tripModel(apiResponse.data);
  };
  return authNetworkService
    .post(`${url}`, formData, {
      headers: { Accept: 'multipart/form-data', 'Content-Type': 'multipart/form-data' },
    })
    .then(_createAndReturnModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

export default { getAll, create };
