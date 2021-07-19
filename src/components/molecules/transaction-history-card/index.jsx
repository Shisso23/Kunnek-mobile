import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import { Text } from 'react-native-elements';
import moment from 'moment';
import PropTypes from 'prop-types';

import useTheme from '../../../theme/hooks/useTheme';
import StatusBox from '../../atoms/status-box';

const TransactionHistoryCard = ({ items }) => {
  const { Colors, Layout, Gutters } = useTheme();

  if (_.isEmpty(items)) {
    return null;
  }

  const _renderTransaction = ({ item }) => (
    <TouchableOpacity
      key={`transaction-${_.get(item, 'id')}`}
      style={[Layout.rowCenterSpaceBetween, Gutters.smallVMargin]}
    >
      <View style={[Layout.rowCenterSpaceAround]}>
        <Icon name="user" size={26} color={Colors.primary} />
        <View style={[Gutters.regularLMargin]}>
          <Text>R{_.get(item, 'amount', '').toFixed(2)}</Text>
          <Text>{moment(_.get(item, 'date', '')).format('D MMMM YYYY, h:mm')}</Text>
        </View>
      </View>
      <StatusBox color={Colors.primary} status={_.startCase(_.get(item, 'status', ''))} />
    </TouchableOpacity>
  );

  return (
    <View style={[Gutters.smallMargin]}>
      <FlatList
        data={items}
        renderItem={_renderTransaction}
        keyExtractor={(item) => `transaction-${_.get(item, 'id')}`}
      />
    </View>
  );
};

TransactionHistoryCard.propTypes = {
  items: PropTypes.array.isRequired,
  item: PropTypes.object,
};

export default TransactionHistoryCard;
