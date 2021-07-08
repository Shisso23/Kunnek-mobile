import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../theme';
import { Text } from 'react-native-elements';
import { Colors } from '../../../theme/Variables';
import dayjs from 'dayjs';

const ChatItem = ({ message }) => {
  const { Layout, Fonts, Gutters } = useTheme();
  const { user } = useSelector(userSelector);
  const userId = _.get(user, 'id');
  const messageUser = _.get(_.get(message, 'user', {}), 'id');

  const _dateFormatter = (date) => {
    const now = dayjs();

    if (dayjs(date).isBefore(now, 'year')) return dayjs(date).format('YY-MM-DD');

    if (dayjs(date).isBefore(now, 'month')) return dayjs(date).format('MMM-DD HH:mm');

    if (dayjs(date).isBefore(now, 'day')) return dayjs(date).format('ddd HH:mm');

    return dayjs(date).format('HH:mm');
  };

  if (userId === messageUser)
    return (
      <View
        style={[Layout.row, Layout.justifyContentBetween, Layout.alignItemsEnd, Gutters.tinyMargin]}
      >
        <Text style={Fonts.subtitleRegular}>{_dateFormatter(_.get(message, 'timestamp'))}</Text>
        <View style={styles.myMessage}>
          <Text style={styles.messageColor}>{_.get(message, 'text')}</Text>
        </View>
      </View>
    );

  return (
    <View style={[Layout.row, Layout.justifyContentBetween, Gutters.tinyMargin]}>
      <View style={styles.theirMessage}>
        <Text style={[styles.messageColor]}>{_.get(message, 'text')}</Text>
      </View>
      <View>
        <Text style={Fonts.subtitleRegular}>{_dateFormatter(_.get(message, 'timestamp'))}</Text>
      </View>
    </View>
  );
};

ChatItem.propTypes = {
  message: PropTypes.object.isRequired,
};

export default ChatItem;

const styles = StyleSheet.create({
  myMessage: {
    borderRadius: 10,
    borderTopRightRadius: 0,
    backgroundColor: Colors.secondary,
    padding: 5,
    flexShrink: 1,
    marginLeft: 5,
  },
  theirMessage: {
    borderRadius: 10,
    borderTopLeftRadius: 0,
    backgroundColor: Colors.primary,
    padding: 5,
    flexShrink: 1,
    marginRight: 5,
  },
  messageColor: {
    color: Colors.white,
  },
});
