import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import { ListItem, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import { IconButton } from 'react-native-paper';

import useTheme from '../../../theme/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { deleteUserBankAccountAction } from '../../../reducers/user-reducer/user-bank-account.actions';

const AccountsList = ({ items }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { Common, Layout, Gutters, Colors } = useTheme();

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
        <>
          <IconButton
            icon={() => <Icon name="pencil-alt" color={Colors.darkerGrey} size={20} />}
            onPress={() => _edit(item)}
          />
          <IconButton
            icon={() => <Icon name="times" color={Colors.darkerGrey} size={20} />}
            onPress={() => _delete(item)}
          />
        </>
      </ListItem>
    ));
  };

  const _delete = (bankAccount) => {
    dispatch(deleteUserBankAccountAction(_.get(bankAccount, 'id', '')));
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
