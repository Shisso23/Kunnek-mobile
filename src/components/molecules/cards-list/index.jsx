import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import { ListItem, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';

const CardsList = ({ items }) => {
  const { Common, Layout, Gutters } = useTheme();

  if (_.isEmpty(items)) {
    return null;
  }

  const _getIcon = (type) => {
    if (type === 'VISA') {
      return <Icon name="cc-visa" size={26} />;
    }
    return <Icon name="cc-mastercard" size={26} />;
  };

  const _renderItems = () => {
    return _.map(items, (item, index) => (
      <ListItem key={`card-${index}`}>
        {_getIcon(_.get(item, 'cardType', ''))}
        <ListItem.Content>
          <ListItem.Title>{_.get(item, 'cardNumber', '')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ));
  };

  return (
    <>
      <View style={[Common.viewCard, Gutters.smallVMargin]}>
        <Text>My Debit/Credit Cards</Text>
        {_renderItems()}
        <TouchableOpacity style={[Layout.rowCenter]}>
          <Text>Add card</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

CardsList.propTypes = {
  items: PropTypes.array,
};

CardsList.defaultProps = {
  items: [],
};

export default CardsList;
