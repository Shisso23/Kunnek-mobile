import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import { ListItem, Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import useTheme from '../../../theme/hooks/useTheme';
import { FlatList } from '../../containers';

const getIcon = () => <Icon name="car-side" size={26} />;

const VehiclesList = ({ items, readOnly }) => {
  const navigation = useNavigation();
  const { Common, Layout, Gutters } = useTheme();

  const ListHeader = () => <Text>{`${readOnly ? 'V' : 'My v'}ehicles`}</Text>;

  const ListFooter = () => {
    if (!readOnly)
      return (
        <TouchableOpacity style={[Layout.rowCenter]} onPress={() => navigation.push('AddVehicle')}>
          <Text>Add vehicle</Text>
        </TouchableOpacity>
      );
    return null;
  };

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
          renderItem={(item, index) => (
            <ListItem key={index}>
              {getIcon()}
              <ListItem.Content>
                <ListItem.Title>{`${_.get(item, 'make', '')} ${_.get(
                  item,
                  'model',
                  '',
                )}`}</ListItem.Title>
                <ListItem.Subtitle>{_.get(item, 'registrationNumber', '')}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )}
        />
      </View>
    </>
  );
};

VehiclesList.propTypes = {
  items: PropTypes.array.isRequired,
  readOnly: PropTypes.bool,
};

VehiclesList.defaultProps = {
  readOnly: false,
};

export default VehiclesList;
