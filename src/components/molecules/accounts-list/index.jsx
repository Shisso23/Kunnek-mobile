import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import { ListItem, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';

const AccountsList = ({ items }) => {
  const { Common, Layout, Gutters } = useTheme();

  if (_.isEmpty(items)) {
    return null;
  }

  const _renderItems = () => {
    return _.map(items, (item, index) => (
      <ListItem key={`account-${index}`}>
        <Icon name="money-check" size={26} />
        <ListItem.Content>
          <ListItem.Title>{_.get(item, 'accountNumber', '')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ));
  };

  return (
    <>
      <View style={[Common.viewCard, Gutters.smallVMargin]}>
        <Text>My Bank Accounts</Text>
        {_renderItems()}
        <TouchableOpacity style={[Layout.rowCenter]}>
          <Text>Add bank account</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

AccountsList.propTypes = {
  items: PropTypes.array,
};

AccountsList.defaultProps = {
  items: [],
};

export default AccountsList;
