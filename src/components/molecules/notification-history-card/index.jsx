import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { Text } from 'react-native-elements';
import moment from 'moment';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

import useTheme from '../../../theme/hooks/useTheme';

const NotificationHistoryCard = ({ items }) => {
  const { Gutters, Common, Layout, Colors } = useTheme();

  if (_.isEmpty(items)) {
    return null;
  }

  const _getIconForNotificationType = (type) => {
    switch (type) {
      case 'push':
        return 'bell';
      case 'email':
        return 'at';
      case 'sms':
        return 'comment';
      default:
        return 'envelope';
    }
  };

  const _renderNotification = ({ item }) => (
    <TouchableOpacity key={`notification-${_.get(item, 'id')}`} style={[styles.cardContainer]}>
      <View style={[Gutters.smallHMargin, Common.viewCard, Layout.row]}>
        <Icon
          name={_getIconForNotificationType(_.get(item, 'notificationType'))}
          color={Colors.secondary}
          size={35}
        />
        <View style={[Layout.fill, Gutters.smallLMargin]}>
          <Text numberOfLines={2} style={[Common.smallText]}>
            {_.get(item, 'message', '')}
          </Text>
          <Text style={[Common.smallGreyText]}>
            {moment(_.get(item, 'date', '')).format('D MMMM YYYY, h:mm')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <FlatList
        data={items}
        renderItem={_renderNotification}
        keyExtractor={(item) => `transaction-${_.get(item, 'id')}`}
      />
    </>
  );
};

NotificationHistoryCard.propTypes = {
  items: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
  },
});
export default NotificationHistoryCard;
