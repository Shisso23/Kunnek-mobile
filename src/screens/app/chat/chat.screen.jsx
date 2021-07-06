import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-elements';
import { FlatList, View } from 'react-native';
import _ from 'lodash';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { useTheme } from '../../../theme';
import ProfilePicture from '../../../components/atoms/profile-picture';
import { StyleSheet } from 'react-native';
import { ChatBottomDrawer, ChatItem } from '../../../components/molecules';
import { useInterval } from '../../../services';
import chatService from '../../../services/sub-services/chat-service/chat.service';

const ChatScreen = ({ route }) => {
  const { parcelRequest } = route.params;
  const chattableId = _.get(parcelRequest, 'id');
  const { user } = useSelector(userSelector);
  const { Layout, Fonts } = useTheme();
  const [chat, setchat] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    chatService.getChat(chattableId).then((response) => {
      setchat(response);
      setMessages(response.messages);
    });
  }, []);

  useInterval(() => {
    chatService.getChat(chattableId).then((response) => {
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
    <View style={Layout.center}>
      <ProfilePicture user={_getOtherUser()} />
      <Text style={Fonts.titleTiny}>{`${_.get(_getOtherUser(), 'fullName')}`}</Text>
    </View>
  );

  const _message = ({ item }) => <ChatItem message={item} />;

  const _sendMessage = (message) => {
    const chatId = _.get(chat, 'id');
    chatService.sendMessage({ ...message, ...{ chatId } }).then((response) => {
      setMessages([...messages, response]);
    });
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={_headerComponent}
        data={messages}
        style={Layout.fill}
        renderItem={_message}
        keyExtractor={(message) => `message-${message.id}`}
      />
      <View style={styles.bottomDrawer}>
        <ChatBottomDrawer submitMessage={_sendMessage} />
      </View>
    </>
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

const styles = StyleSheet.create({
  bottomDrawer: {
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
