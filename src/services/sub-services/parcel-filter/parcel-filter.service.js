import _ from 'lodash';

import { apiFiltersFormModel } from '../../../models/app/parcel-filter/parcel-filter-form.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import parcelRequestsUrls from '../../sub-services/parcel-request-service/parcel-request.urls';
import { parcelRequestModel } from '../../../models/app/parcel-request/parcel-request.model';

const filterParcels = async (params) => {
  const url = parcelRequestsUrls.parcelRequestsUrl(params);
  const apiModal = apiFiltersFormModel(params);
  const nonEmptyParams = _.reduce(
    apiModal,
    (parameters, value, field) => (parameters += `${field}=${value}&`),
    '?',
  );

  const _createAndReturnListModel = (apiResponse) =>
    _.map(_.get(apiResponse, 'data.data', []), (item) => parcelRequestModel(item));
  const apiResponse = await authNetworkService.get(
    `${url}${nonEmptyParams.substring(0, nonEmptyParams.length - 1)}`,
  );
  return _createAndReturnListModel(apiResponse);
};

export default {
  filterParcels,
};
