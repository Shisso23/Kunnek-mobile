import CreateAction from '../action-utilities/action-creator';

const reducerName = 'chat';

const setChat = CreateAction(reducerName, 'SET_CHAT');
export const setChatAction = setChat.action;

const setMessages = CreateAction(reducerName, 'SET_MESSAGES');
export const setMessagesAction = setMessages.action;

export const chatSelector = (reducers) => reducers.chatReducer;

const initialState = {
  chat: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case setChat.actionType:
      return {
        ...state,
        chat: action.payload,
      };
    case setMessages.actionType:
      return {
        ...state,
        chat: {
          ...state.chat,
          messages: [...state.chat.messages, action.payload],
        },
      };
    default:
      return state;
  }
};
