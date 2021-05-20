import tripUrls from './trip.urls';
import {
  apiParcelRequestModel,
  parcelRequestModel,
} from '../../../models/app/parcel-request/parcel-request.model';
import networkService from '../network-service/network.service';
import authNetworkService from '../auth-network-service/auth-network.service';
import { apiTripModel, tripModel } from '../../../models/app/trip/trip.model';
import _ from 'lodash';
import { getParamString } from '../../../helpers/network.helper';

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
  const _createAndReturnModel = (apiResponse) => tripModel(apiResponse.data);
  return networkService
    .post(`${url}`, dataModel)
    .then(_createAndReturnModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

export default { getAll, create };
