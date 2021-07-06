import chatService from '../../services/sub-services/chat-service/chat.service';
import { setChatAction, setMessagesAction } from './chat.reducer';

export const getChatAction = (id) => (dispatch) => {
  return chatService.get(id).then((response) => {
    return dispatch(setChatAction(response));
  });
};

export const sendMessageAction = (data = {}) => (dispatch) => {
  return chatService.create(data).then((newMessage) => {
    return dispatch(setMessagesAction(newMessage));
  });
};

export const updateChatAction = (id) => (dispatch, getState) => {
  return chatService.get(id).then((response) => {
    const { chat } = getState().chatReducer;
    if (response.messages.length !== chat.messages.length) return dispatch(setChatAction(response));
  });
};
