import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  chatsUrl: () => `${apiUrl}/chats`,
  newChatUrl: () => `${apiUrl}/chats/create_or_show`,
  messageUrl: () => `${apiUrl}/messages`,
};
