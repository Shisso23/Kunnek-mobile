import { apiQueryModal } from '../../../models/app/query-model/query.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import queryUrls from './query.urls';

const createQuery = async (formData) => {
  const url = queryUrls.createQueryUrl();
  const queryModal = apiQueryModal(formData);
  const apiResponse = await authNetworkService.post(`${url}`, queryModal);
  return apiResponse.data;
};

const getAll = async () => {
  const url = queryUrls.getQueriesUrl();
  const apiResponse = await authNetworkService.get(`${url}`);
  return apiResponse;
};

export default {
  createQuery,
  getAll,
};
