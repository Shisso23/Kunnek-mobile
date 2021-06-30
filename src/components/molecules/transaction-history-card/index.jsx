import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import { Text } from 'react-native-elements';
import moment from 'moment';
import PropTypes from 'prop-types';

import useTheme from '../../../theme/hooks/useTheme';
import StatusBox from '../../atoms/status-box';

const TransactionHistoryCard = ({ items }) => {
  const { Colors, Layout, Gutters } = useTheme();
  const navigation = useNavigation();

  if (_.isEmpty(items)) {
    return null;
  }

  return (
    <View style={[Gutters.smallMargin]}>
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={[Layout.rowCenterSpaceBetween, Gutters.smallVMargin]}
            onPress={() => navigation.navigate('TransactionDetails', { payment: item })}
          >
            <View style={[Layout.rowCenterSpaceAround]}>
              <Icon name="user" size={26} color={Colors.primary} />
              <View style={[Gutters.regularLMargin]}>
                <Text>R{_.get(item, 'amount', '').toFixed(2)}</Text>
                <Text>{moment(_.get(item, 'date', '')).format('D MMMM YYYY, h:mm')}</Text>
              </View>
            </View>
            <StatusBox color={Colors.primary} status={_.get(item, 'status', '')} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

TransactionHistoryCard.propTypes = {
  items: PropTypes.array.isRequired,
};

export default TransactionHistoryCard;
