import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import { ListItem, Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import useTheme from '../../../theme/hooks/useTheme';
import { IconButton } from 'react-native-paper';
import { deleteVehicleAction } from '../../../reducers/user-reducer/user-vehicles.actions';
import { useDispatch } from 'react-redux';

const VehiclesList = ({ items, readOnly }) => {
  const navigation = useNavigation();
  const { Common, Layout, Gutters, Colors } = useTheme();
  const dispatch = useDispatch();

  if (_.isEmpty(items)) {
    return null;
  }

  const _renderItems = () => {
    return _.map(items, (item, index) => (
      <ListItem key={`vehicle-${index}`}>
        <Icon name="car-side" size={26} />
        <ListItem.Content>
          <ListItem.Title>{`${_.get(item, 'make', '')} ${_.get(
            item,
            'model',
            '',
          )}`}</ListItem.Title>
          <ListItem.Subtitle>{_.get(item, 'registrationNumber', '')}</ListItem.Subtitle>
        </ListItem.Content>
        {!readOnly && (
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
        )}
      </ListItem>
    ));
  };

  const _delete = (vehicle) => {
    dispatch(deleteVehicleAction(_.get(vehicle, 'id', '')));
  };

  const _edit = (vehicle) => {
    navigation.navigate('EditVehicle', { vehicle });
  };

  const _listFooter = () => {
    if (!readOnly)
      return (
        <TouchableOpacity style={[Layout.rowCenter]} onPress={() => navigation.push('AddVehicle')}>
          <Text>Add vehicle</Text>
        </TouchableOpacity>
      );
    return null;
  };

  return (
    <>
      <View style={[Common.viewCard, Gutters.smallVMargin]}>
        <Text>{`${readOnly ? 'V' : 'My v'}ehicles`}</Text>
        {_renderItems()}
        {_listFooter()}
      </View>
    </>
  );
};

VehiclesList.propTypes = {
  items: PropTypes.array,
  readOnly: PropTypes.bool,
};

VehiclesList.defaultProps = {
  items: [],
  readOnly: false,
};

export default VehiclesList;
