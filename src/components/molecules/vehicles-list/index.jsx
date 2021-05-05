import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import { ListItem, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';

const getIcon = () => <Icon name="car-side" size={26} />;

const VehiclesList = ({ items }) => {
  const navigation = useNavigation();
  const { Common, Layout, Gutters } = useTheme();

  const ListHeader = () => <Text>My Vehicles</Text>;

  const ListFooter = () => (
    <TouchableOpacity style={[Layout.rowCenter]} onPress={() => navigation.push('AddVehicle')}>
      <Text>Add vehicle</Text>
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
                <ListItem.Title>{`${_.get(item, 'make', '')}${_.get(
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
};

export default VehiclesList;
