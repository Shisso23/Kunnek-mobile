import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import { ListItem, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import useTheme from '../../../theme/hooks/useTheme';

const AccountsList = ({ items }) => {
  const navigation = useNavigation();
  const { Common, Layout, Gutters } = useTheme();

  if (_.isEmpty(items)) {
    return null;
  }

  const _renderItems = () => {
    return _.map(items, (item, index) => (
      <TouchableOpacity onPress={() => _edit(item)} key={`account-${index}`}>
        <ListItem>
          <Icon name="money-check" size={26} />
          <ListItem.Content>
            <ListItem.Title>{_.get(item, 'accountNumber', '')}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    ));
  };

  const _edit = (bankAccount) => {
    navigation.navigate('EditBankAccount', { bankAccount });
  };

  return (
    <>
      <View style={[Common.viewCard, Gutters.smallVMargin]}>
        <Text>My Bank Accounts</Text>
        {_renderItems()}
        <TouchableOpacity
          style={Layout.rowCenter}
          onPress={() => navigation.navigate('AddBankAccount')}
        >
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
