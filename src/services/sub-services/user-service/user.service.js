import authNetworkService from '../auth-network-service/auth-network.service';
import { userModel, apiUserModel } from '../../../models';
import userUrls from './user.urls';

const getUser = async (id) => {
  const url = userUrls.userUrl(id);

  const _createAndReturnUserModel = (apiResponse) => userModel(apiResponse.data);
  const apiResponse = await authNetworkService.get(url);
  return _createAndReturnUserModel(apiResponse);
};

const updateUser = ({ formData }) => {
  const url = userUrls.userUrl();
  const apiUser = apiUserModel(formData);
  return authNetworkService.patch(url, apiUser).catch((error) => {
    error.errors = userModel(error.errors);
    // eslint-disable-next-line no-console
    console.warn(error);
    return Promise.reject(error);
  });
};

export default {
  getUser,
  updateUser,
};
