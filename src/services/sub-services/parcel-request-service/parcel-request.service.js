import _ from 'lodash';
import networkService from '../network-service/network.service';
import config from '../../../config';
import { objectToFormData } from '../../../helpers/data.helper';
import parcelRequestUrls from './parcel-request.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import {
  apiParcelRequestModel,
  parcelRequestModel,
} from '../../../models/app/parcel-request/parcel-request.model';
import { getParamString } from '../../../helpers/network.helper';

const get = () => {
  const url = parcelRequestUrls.parcelRequestsUrl();
  const _createAndReturnModel = (apiResponse) => parcelRequestModel(apiResponse.data);
  return authNetworkService
    .get(url)
    .then(_createAndReturnModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const getAll = (params = {}) => {
  const url = parcelRequestUrls.parcelRequestsUrl();
  const _createAndReturnModel = (apiResponse) => parcelRequestModel(apiResponse.data);
  return networkService
    .get(`${url}${getParamString(params)}`)
    .then(_createAndReturnModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const create = (data = {}) => {
  const url = parcelRequestUrls.parcelRequestsUrl();
  const dataModel = apiParcelRequestModel(data);
  const _createAndReturnModel = (apiResponse) => parcelRequestModel(apiResponse.data);
  return networkService
    .post(`${url}`, dataModel)
    .then(_createAndReturnModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const update = (id, data = {}) => {
  const url = parcelRequestUrls.parcelRequestsUrl();
  const dataModel = apiParcelRequestModel(data);
  const _createAndReturnModel = (apiResponse) => parcelRequestModel(apiResponse.data);
  return networkService
    .patch(`${url}/${id}`, dataModel)
    .then(_createAndReturnModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const remove = (id) => {
  const url = parcelRequestUrls.parcelRequestsUrl();
  return networkService.delete(`${url}/${id}`).catch((error) => {
    // eslint-disable-next-line no-console
    console.warn(error);
    return Promise.reject(error);
  });
};

export default {
  get,
  getAll,
  create,
  update,
  remove,
};
