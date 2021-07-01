import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import { ListItem, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';

const IdNumber = ({ item }) => {
  const { Common, Gutters } = useTheme();

  if (_.isEmpty(_.get(item, 'idNumber'))) {
    return null;
  }

  return (
    <View style={[Common.viewCard, Gutters.smallVMargin]}>
      <Text>Identification number</Text>
      <ListItem key={'idNumber'}>
        <Icon name="money-check" size={26} />
        <ListItem.Content>
          <ListItem.Title>{_.get(item, 'idNumber', '')}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

IdNumber.propTypes = {
  item: PropTypes.object.isRequired,
};

export default IdNumber;
