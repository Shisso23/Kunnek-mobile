import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import { ListItem, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';

const getIcon = () => <Icon name="money-check" size={26} />;

const IdNumber = ({ item }) => {
  const { Common, Gutters } = useTheme();

  const ListHeader = () => <Text>Identification number</Text>;

  if (_.isEmpty(_.get(item, 'idNumber'))) {
    return null;
  }

  return (
    <>
      <View style={[Common.viewCard, Gutters.smallVMargin]}>
        <Text>{ListHeader()}</Text>
        <ListItem key={'idNumber'}>
          {getIcon()}
          <ListItem.Content>
            <ListItem.Title>{_.get(item, 'idNumber', '')}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </>
  );
};

IdNumber.propTypes = {
  item: PropTypes.object.isRequired,
};

export default IdNumber;
