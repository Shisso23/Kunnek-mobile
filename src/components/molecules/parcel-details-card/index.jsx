import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';

import { ParcelPhoto } from '../../atoms';
import { useTheme } from '../../../theme';
import { formatDate } from '../../../helpers/date.helper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ParcelDetailsCard = ({ parcelRequest }) => {
  const navigation = useNavigation();
  const { Gutters, Layout, Common } = useTheme();

  return (
    <TouchableOpacity
      style={[Layout.row, Layout.justifyContentBetween, Common.viewCard, Gutters.regularMargin]}
      onPress={() => {
        navigation.navigate('ViewParcel', { parcelRequest });
      }}
    >
      <ParcelPhoto parcelRequest={parcelRequest} />
      <View style={[Gutters.smallHMargin, Layout.fill]}>
        <Text>{_.get(parcelRequest, 'description')}</Text>
        <Text>{`R ${_.get(parcelRequest, 'price')}`}</Text>
        <Text>{`Pick-up: ${_.get(parcelRequest, 'abbreviatedPickUpAddress')}`}</Text>
        <Text>{`Drop-off: ${_.get(parcelRequest, 'abbreviatedDropOffAddress')}`}</Text>
        <Text>{`Due date: ${formatDate(_.get(parcelRequest, 'latestDeliveryDateTime'))}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

ParcelDetailsCard.propTypes = {
  parcelRequest: PropTypes.object.isRequired,
};

ParcelDetailsCard.defaultProps = {};

export default ParcelDetailsCard;
