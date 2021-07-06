import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-elements';
import { FlatList, View } from 'react-native';
import _ from 'lodash';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { useTheme } from '../../../theme';
import ProfilePicture from '../../../components/atoms/profile-picture';
import { StyleSheet } from 'react-native';
import { ChatBottomDrawer } from '../../../components/molecules';

const ChatScreen = ({ route }) => {
  const { parcelRequest } = route.params;
  const { user } = useSelector(userSelector);
  const { Layout, Fonts } = useTheme();
  const messages = [
    { _id: 1, text: 'Hi' },
    { _id: 2, text: 'Hi' },
    { _id: 3, text: "I'd like to deliver" },
  ];

  const _headerComponent = () => (
    <View style={Layout.center}>
      <ProfilePicture user={user} />
      <Text style={Fonts.titleTiny}>{`${_.get(user, 'fullName')}`}</Text>
    </View>
  );

  const _message = ({ item }) => <Text>{_.get(item, 'text')}</Text>;

  return (
    <>
      <FlatList
        ListHeaderComponent={_headerComponent}
        data={messages}
        renderItem={_message}
        keyExtractor={(message) => `message-${message._id}`}
      />
      <View style={styles.bottomDrawer}>
        <ChatBottomDrawer onPress={() => {}} chatId={_.get(parcelRequest, 'id')} />
      </View>
    </>
  );
};

ChatScreen.propTypes = {
  route: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

export default ChatScreen;

const styles = StyleSheet.create({
  bottomDrawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
