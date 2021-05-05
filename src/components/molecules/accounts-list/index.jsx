import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import { ListItem, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';

const getIcon = () => <Icon name="money-check" size={26} />;

const AccountsList = ({ items }) => {
  const { Common, Layout, Gutters } = useTheme();

  const ListHeader = () => <Text>My Bank Accounts</Text>;

  const ListFooter = () => (
    <TouchableOpacity style={[Layout.rowCenter]}>
      <Text>Add bank account</Text>
    </TouchableOpacity>
  );

  if (_.isEmpty(items)) {
    return null;
  }

  return (
    <>
      <View style={[Common.viewCard, Gutters.smallVMargin]}>
        <FlatList
          data={items}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          renderItem={({ item, index }) => (
            <ListItem key={index}>
              {getIcon()}
              <ListItem.Content>
                <ListItem.Title>{_.get(item, 'accountNumber', '')}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )}
        />
      </View>
    </>
  );
};

AccountsList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default AccountsList;
