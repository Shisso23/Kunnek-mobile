import _ from 'lodash';

import parcelRequestUrls from './parcel-request.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import {
  apiParcelRequestModel,
  apiParcelRequestUpdateModel,
  apiParcelStatusCancelModel,
  apiParcelStatusUpdateModel,
  parcelRequestModel,
} from '../../../models/app/parcel-request/parcel-request.model';
import { getParamString } from '../../../helpers/network.helper';
import { objectToFormData } from '../../../helpers/data.helper';
import { apiFiltersFormModel } from '../../../models/app/parcel-filter/parcel-filter-form.model';

const get = (id) => {
  const url = parcelRequestUrls.parcelRequestsUrl();
  const _createAndReturnModel = (apiResponse) => parcelRequestModel(apiResponse.data);
  return authNetworkService
    .get(`${url}/${id}`)
    .then(_createAndReturnModel)
    .catch((error) => {
      console.warn(error);
      return Promise.reject(error);
    });
};

const getAll = (params = {}) => {
  const url = parcelRequestUrls.parcelRequestsUrl();
  const _createAndReturnListModel = (apiResponse) =>
    _.map(_.get(apiResponse, 'data.data', []), (item) => parcelRequestModel(item));
  return authNetworkService
    .get(`${url}${getParamString(params)}`)
    .then(_createAndReturnListModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const filterParcels = async (params) => {
  const url = parcelRequestUrls.parcelRequestsUrl();
  const apiModal = apiFiltersFormModel(params);
  const _createAndReturnListModel = (apiResponse) =>
    _.map(_.get(apiResponse, 'data.data', []), (item) => parcelRequestModel(item));
  const apiResponse = await authNetworkService.get(`${url}${getParamString(apiModal)}`);

  return _createAndReturnListModel(apiResponse);
};

const create = (data = {}) => {
  const url = parcelRequestUrls.parcelRequestsUrl();
  const dataModel = apiParcelRequestModel(data);
  const formData = objectToFormData(_.get(dataModel, 'job', {}), undefined, 'job');
  const _createAndReturnModel = (apiResponse) => parcelRequestModel(apiResponse.data);
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

const update = (id, data = {}) => {
  const url = parcelRequestUrls.parcelRequestsUrl();
  const dataModel = apiParcelRequestUpdateModel(data);
  const formData = objectToFormData(_.get(dataModel, 'job', {}), undefined, 'job');
  const _createAndReturnModel = (apiResponse) => parcelRequestModel(apiResponse.data);
  return authNetworkService
    .patch(`${url}/${id}`, formData, {
      headers: { Accept: 'multipart/form-data', 'Content-Type': 'multipart/form-data' },
    })
    .then(_createAndReturnModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const updateStatus = (id, data = {}) => {
  const url = parcelRequestUrls.parcelRequestsUrl();
  const dataModel = apiParcelStatusUpdateModel(data);
  return authNetworkService
    .patch(`${url}/${id}`, dataModel)
    .then((response) => parcelRequestModel(response.data))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const cancelDeliveryRequest = (id, data = {}) => {
  const url = parcelRequestUrls.parcelRequestsUrl();
  const dataModel = apiParcelStatusCancelModel(data);
  const _createAndReturnModel = (apiResponse) => {
    return parcelRequestModel(apiResponse.data);
  };
  return authNetworkService
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
  return authNetworkService.delete(`${url}/${id}`).catch((error) => {
    // eslint-disable-next-line no-console
    console.warn(error);
    return Promise.reject(error);
  });
};

const getServiceFee = (id) =>
  authNetworkService
    .get(`${parcelRequestUrls.parcelRequestsUrl()}/${id}/service_fee`)
    .then((response) => _.get(response, 'data'));

export default {
  get,
  getAll,
  filterParcels,
  create,
  update,
  updateStatus,
  cancelDeliveryRequest,
  remove,
  getServiceFee,
};
