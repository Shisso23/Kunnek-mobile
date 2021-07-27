import chatService from '../../services/sub-services/chat-service/chat.service';

export const createOrGetChatAction = (id) => () => {
  return chatService.createOrGetChat(id).then((response) => {
    return response;
  });
};

export const getChatAction = (id) => () => {
  return chatService.getChat(id).then((response) => {
    return response;
  });
};

export const sendMessageAction = (data = {}) => () => {
  return chatService.sendMessage(data).then((newMessage) => {
    return newMessage;
  });
};
