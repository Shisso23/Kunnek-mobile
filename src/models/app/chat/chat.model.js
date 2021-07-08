import _ from 'lodash';
import { userModel } from '../user/user.model';

const usersModel = (_apiUsersModel) => _.map(_apiUsersModel, (user) => userModel(user));

const messagesModel = (_apiMessagesModel) =>
  _.map(_apiMessagesModel, (message) => messageModel(message));

const messageUserModel = (_apiMessageUserModel) => ({
  id: _.get(_apiMessageUserModel, '_id', ''),
  name: _.get(_apiMessageUserModel, 'name', ''),
});

export const chatModel = (_apiChatModel = {}) => ({
  id: _.get(_apiChatModel, 'id', ''),
  users: usersModel(_.get(_apiChatModel, 'users', [])),
  messages: messagesModel(_.get(_apiChatModel, 'messages', [])),
});

export const apiChatModel = (_appChatModel = {}) => ({
  chat: {
    chattable_id: _.get(_appChatModel, 'id'),
    chattable_type: 'Job',
  },
});

export const messageModel = (_apiMessageModel) => ({
  text: _.get(_apiMessageModel, 'text', ''),
  id: _.get(_apiMessageModel, '_id', ''),
  timestamp: _.get(_apiMessageModel, 'createdAt', ''),
  user: messageUserModel(_.get(_apiMessageModel, 'user', {})),
});

export const apiMessageModel = (_appMessageModel = {}) => ({
  message: {
    chat_id: _.get(_appMessageModel, 'chatId', ''),
    text: _.get(_appMessageModel, 'message', ''),
  },
});
