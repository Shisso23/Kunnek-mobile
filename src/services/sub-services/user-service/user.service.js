import authNetworkService from '../auth-network-service/auth-network.service';
import { userModel, apiUpdateUserModel, apiUpdateUserDeviceModel } from '../../../models';
import userUrls from './user.urls';
import { objectToFormData } from '../../../helpers/data.helper';
import _ from 'lodash';

const getUser = async (id) => {
  const url = userUrls.userUrl(id);

  const _createAndReturnUserModel = (apiResponse) => userModel(apiResponse.data);
  const apiResponse = await authNetworkService.get(url);
  return _createAndReturnUserModel(apiResponse);
};

const updateUser = (formData) => {
  const url = userUrls.userUrl(_.get(formData, 'id', '1'));
  const apiUser = apiUpdateUserModel(formData);
  const apiUserForm = objectToFormData(_.get(apiUser, 'user', {}), undefined, 'user');
  const _createAndReturnUserModel = (apiResponse) => userModel(apiResponse.data);
  return authNetworkService
    .patch(url, apiUserForm, {
      headers: { Accept: 'multipart/form-data', 'Content-Type': 'multipart/form-data' },
    })
    .then(_createAndReturnUserModel)
    .catch((error) => {
      error.errors = userModel(error.errors);
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const updateDeviceToken = (formData) => {
  const url = userUrls.userUrl();
  const apiUser = apiUpdateUserDeviceModel(formData);
  const _createAndReturnUserModel = (apiResponse) => userModel(apiResponse.data);
  return authNetworkService
    .patch(url, apiUser)
    .then(_createAndReturnUserModel)
    .catch((error) => {
      error.errors = userModel(error.errors);
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const getDelivererId = async () => {
  const url = userUrls.getDelivererId();
  const { data } = await authNetworkService.post(url);
  return data.id;
};

const getSenderId = async () => {
  const url = userUrls.getSenderId();
  const { data } = await authNetworkService.post(url);
  return data.id;
};

export default {
  getUser,
  updateUser,
  getSenderId,
  getDelivererId,
  updateDeviceToken,
};
