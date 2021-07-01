import React from 'react';
import { StyleSheet, View } from 'react-native';
import _ from 'lodash';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import { ParcelPhoto } from '../../atoms';
import { useTheme } from '../../../theme';
import { formatDate } from '../../../helpers/date.helper';
import { Colors } from '../../../theme/Variables';

const ViewParcelCard = ({ parcelRequest }) => {
  const { Gutters, Layout, Common } = useTheme();

  const _getDimensions = () => {
    const width = `W:${_.get(parcelRequest, 'itemWidth')}`;
    const length = `L:${_.get(parcelRequest, 'itemLength')}`;
    const height = `H:${_.get(parcelRequest, 'itemHeight')}`;
    return `${width} x ${length} x ${height} cm`;
  };

  const _getSender = () => {
    const sender = _.get(parcelRequest, 'sender');
    return _.get(sender, 'fullName');
  };

  return (
    <View style={[Common.viewCard, Gutters.regularMargin]}>
      <View style={Layout.colCenter}>
        <ParcelPhoto parcelRequest={parcelRequest} style={styles.parcelPhotoSize} />
        <Text style={[styles.textColor, Gutters.smallMargin]}>
          {_.get(parcelRequest, 'description')}
        </Text>
      </View>
      <View style={[Gutters.smallHMargin, Layout.fill, Layout.justifyContentBetween]}>
        <View style={[Layout.row, Layout.fill, Layout.justifyContentBetween, Gutters.smallVMargin]}>
          <Text>Pick-up:</Text>
          <Text style={[styles.textSize]}>{_.get(parcelRequest, 'pickUpAddress')}</Text>
        </View>
        <View style={[Layout.row, Layout.fill, Layout.justifyContentBetween, Gutters.smallVMargin]}>
          <Text>Drop-off:</Text>
          <Text style={[styles.textSize]}>{`${_.get(parcelRequest, 'dropOffAddress')}`}</Text>
        </View>
        <View style={[Layout.row, Layout.fill, Layout.justifyContentBetween, Gutters.smallVMargin]}>
          <Text>Date: </Text>
          <Text>{`${formatDate(_.get(parcelRequest, 'latestDeliveryDateTime'))}`}</Text>
        </View>
        <View style={[Layout.row, Layout.fill, Layout.justifyContentBetween, Gutters.smallVMargin]}>
          <Text>Offer: </Text>
          <Text>{`${_.get(parcelRequest, 'price')}`}</Text>
        </View>
        <View style={[Layout.row, Layout.fill, Layout.justifyContentBetween, Gutters.smallVMargin]}>
          <Text>Dimensions: </Text>
          <Text>{`${_getDimensions()}`}</Text>
        </View>
        <View style={[Layout.row, Layout.fill, Layout.justifyContentBetween, Gutters.smallVMargin]}>
          <Text>Weight: </Text>
          <Text>{`${_.get(parcelRequest, 'itemWeight')} kg`}</Text>
        </View>
        <View style={[Layout.row, Layout.fill, Layout.justifyContentBetween, Gutters.smallVMargin]}>
          <Text>Sender: </Text>
          <Text>{_getSender()}</Text>
        </View>
      </View>
    </View>
  );
};

ViewParcelCard.propTypes = {
  parcelRequest: PropTypes.object,
};

ViewParcelCard.defaultProps = {};

export default ViewParcelCard;

const styles = StyleSheet.create({
  parcelPhotoSize: {
    height: 110,
    width: 110,
  },
  textColor: {
    color: Colors.primary,
  },
  textSize: {
    maxWidth: '70%',
    textAlign: 'right',
  },
});
