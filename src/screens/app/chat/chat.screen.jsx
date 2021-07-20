import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native-elements';
import { FlatList, View, KeyboardAvoidingView, Platform } from 'react-native';
import _ from 'lodash';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { useTheme } from '../../../theme';
import ProfilePicture from '../../../components/atoms/profile-picture';
import { ChatBottomDrawer, ChatItem } from '../../../components/molecules';
import { useInterval } from '../../../services';
import { getChatAction, sendMessageAction } from '../../../reducers/chat-reducer/chat.actions';

const ChatScreen = ({ route }) => {
  const { parcelRequest } = route.params;
  const chattableId = _.get(parcelRequest, 'id');
  const { user } = useSelector(userSelector);
  const { Layout, Fonts, Gutters } = useTheme();
  const [chat, setChat] = useState({});
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChatAction(chattableId)).then((response) => {
      setChat(response);
      setMessages(response.messages);
    });
  }, []);

  useInterval(() => {
    dispatch(getChatAction(chattableId)).then((response) => {
      if (response.messages.length !== messages.length) setMessages(response.messages);
    });
  }, 5000);

  const _getOtherUser = () => {
    if (_.get(_.get(parcelRequest, 'sender', {}), 'userId') === _.get(user, 'id')) {
      return _.get(parcelRequest, 'deliverer', {});
    } else {
      return user;
    }
  };

  const _headerComponent = () => (
    <View style={[Layout.center, Gutters.largeBMargin]}>
      <ProfilePicture user={_getOtherUser()} />
      <Text style={Fonts.titleTiny}>{`${_.get(_getOtherUser(), 'fullName')}`}</Text>
    </View>
  );

  const _message = ({ item }) => <ChatItem message={item} />;

  const _sendMessage = (message) => {
    const chatId = _.get(chat, 'id');
    dispatch(sendMessageAction({ ...message, ...{ chatId } })).then((response) => {
      setMessages([...messages, response]);
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={Layout.fill}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ListHeaderComponent={_headerComponent}
        data={messages}
        style={Layout.fill}
        renderItem={_message}
        keyExtractor={(message) => `message-${message.id}`}
      />
      <ChatBottomDrawer submitMessage={_sendMessage} />
    </KeyboardAvoidingView>
  );
};

ChatScreen.propTypes = {
  route: PropTypes.object.isRequired,
  item: PropTypes.object,
};

ChatScreen.defaultProps = {
  item: {},
};

export default ChatScreen;
