import {
  apiChatModel,
  apiMessageModel,
  chatModel,
  messageModel,
} from '../../../models/app/chat/chat.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import chatUrls from './chat.urls';

const get = (id) => {
  const url = chatUrls.newChatUrl();
  const dataModel = apiChatModel({ id });
  const _createAndReturnModel = (apiResponse) => chatModel(apiResponse.data);
  return authNetworkService
    .post(url, dataModel)
    .then(_createAndReturnModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const create = (data = {}) => {
  const url = chatUrls.messageUrl();
  const dataModel = apiMessageModel(data);
  const _createAndReturnModel = (apiResponse) => messageModel(apiResponse.data);

  return authNetworkService
    .post(url, dataModel)
    .then(_createAndReturnModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

export default {
  get,
  create,
};
