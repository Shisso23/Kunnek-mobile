import tripUrls from './trip.urls';
import {
  apiParcelRequestModel,
  parcelRequestModel,
} from '../../../models/app/parcel-request/parcel-request.model';
import networkService from '../network-service/network.service';

const create = (data = {}) => {
  const url = tripUrls.tripsUrl();
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

export { create };
