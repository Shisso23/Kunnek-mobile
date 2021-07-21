import chatService from '../../services/sub-services/chat-service/chat.service';

export const createorGetChatAction = (id) => () => {
  return chatService.createOrGetChat(id).then((response) => {
    return response;
  });
};

export const getChat = (id) => () => {
  return chatService.getChat(id).then((response) => {
    return response;
  });
};

export const sendMessageAction = (data = {}) => () => {
  return chatService.sendMessage(data).then((newMessage) => {
    return newMessage;
  });
};
