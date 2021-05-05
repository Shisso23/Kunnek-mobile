import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import { ListItem, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';

const getIcon = (type) => {
  if (type === 'VISA') {
    return <Icon name="cc-visa" size={26} />;
  }
  return <Icon name="cc-mastercard" size={26} />;
};

const CardsList = ({ items }) => {
  const { Common, Layout, Gutters } = useTheme();

  const ListHeader = () => <Text>My Debit/Credit Cards</Text>;

  const ListFooter = () => (
    <TouchableOpacity style={[Layout.rowCenter]}>
      <Text>Add card</Text>
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
              {getIcon(_.get(item, 'cardType', ''))}
              <ListItem.Content>
                <ListItem.Title>{_.get(item, 'cardNumber', '')}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )}
        />
      </View>
    </>
  );
};

CardsList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default CardsList;
