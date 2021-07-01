import _ from 'lodash';

import authNetworkService from '../auth-network-service/auth-network.service';
import actionsUrls from './actions.urls';

const getActionId = (jobId) => {
  const url = actionsUrls.actionsUrl();
  return authNetworkService
    .get(`${url}/?job_id=${jobId}`)
    .then((response) => {
      const data = _.get(response, 'data');
      const action =
        data[_.findIndex(data, (action) => _.get(action, 'action_type') === 'deliver')];
      const actionId = _.get(action, 'id');
      return actionId;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const sendOtp = (id) => {
  const url = actionsUrls.actionsUrl();
  return authNetworkService
    .get(`${url}/${id}/send_otp`)
    .then((response) => _.get(response, 'data'))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const verifyOTP = (id, params) => {
  const url = actionsUrls.actionsUrl();
  return authNetworkService
    .post(`${url}/${id}/verify_otp`, params)
    .then((response) => {
      return _.get(response, 'data');
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

// const create = (data = {}) => {
//   const url = parcelRequestUrls.parcelRequestsUrl();
//   const dataModel = apiParcelRequestModel(data);
//   const formData = objectToFormData(_.get(dataModel, 'job', {}), undefined, 'job');
//   const _createAndReturnModel = (apiResponse) => parcelRequestModel(apiResponse.data);
//   return authNetworkService
//     .post(`${url}`, formData, {
//       headers: { Accept: 'multipart/form-data', 'Content-Type': 'multipart/form-data' },
//     })
//     .then(_createAndReturnModel)
//     .catch((error) => {
//       // eslint-disable-next-line no-console
//       console.warn(error);
//       return Promise.reject(error);
//     });
// };

export default {
  getActionId,
  sendOtp,
  verifyOTP,
};
