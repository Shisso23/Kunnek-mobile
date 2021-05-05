import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { Text } from 'react-native-elements';
import moment from 'moment';
import PropTypes from 'prop-types';

import useTheme from '../../../theme/hooks/useTheme';

const NotificationHistoryCard = ({ items }) => {
  const { Gutters, Common } = useTheme();

  if (_.isEmpty(items)) {
    return null;
  }

  return (
    <>
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} style={styles.cardContainer}>
            <View style={[Gutters.smallLMargin]}>
              <Text numberOfLines={1} style={[Common.smallText]}>
                {_.get(item, 'message', '')}
              </Text>
              <Text style={[Common.smallGreyText]}>
                {moment(_.get(item, 'date', '')).format('D MMMM YYYY, h:mm')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

NotificationHistoryCard.propTypes = {
  items: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
  },
});
export default NotificationHistoryCard;
