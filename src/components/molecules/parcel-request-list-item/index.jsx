import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Text } from 'react-native-elements';

import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/Variables';
import { formatDate } from '../../../helpers/date.helper';
import { ParcelPhoto, TagPanel } from '../../atoms';

const ParcelRequestListItem = ({ parcelRequest }) => {
  const { Fonts, Gutters, Layout } = useTheme();
  const { user } = useSelector(userSelector);
  const sender = _.get(parcelRequest, 'sender');
  const deliverer = _.get(parcelRequest, 'deliverer');

  const _isDeliverer = () => {
    return _.get(user, 'id') === _.get(deliverer, 'userId');
  };

  const _getTitle = () => {
    return _.get(parcelRequest, 'description');
  };

  const _getOtherUserName = () => {
    return _.get(_getOtherUser(), 'fullName') || 'Still waiting for offer';
  };

  const _formatStatus = (parcel) => {
    const statusMessage = _.replace(_.get(parcel, 'status'), '_', ' ');
    return _.startCase(statusMessage);
  };

  const _getOtherUser = () => {
    if (_isDeliverer()) {
      return sender;
    }

    return deliverer;
  };

  return (
    <View style={[styles.parcelRequestListItemContainer]}>
      <View style={[styles.parcelRequestListItem, Layout.row, Layout.justifyContentBetween]}>
        <ParcelPhoto parcelRequest={parcelRequest} />
        <View style={[Gutters.smallHMargin, Layout.fill]}>
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            <Text style={[Fonts.titleTiny, Layout.fill]}>{_getTitle()}</Text>
            <TagPanel userRole={_isDeliverer() ? 'Driver' : 'Sender'} />
          </View>
          <View>
            <Text style={Layout.fill}>{_getOtherUserName()}</Text>
            <Text>{`R ${_.get(parcelRequest, 'price')}`}</Text>
            <Text>{`Pick-up: ${_.get(parcelRequest, 'abbreviatedPickUpAddress')}`}</Text>
            <Text>{`Drop-off: ${_.get(parcelRequest, 'abbreviatedDropOffAddress')}`}</Text>
            <Text>{`Due date: ${formatDate(_.get(parcelRequest, 'latestDeliveryDateTime'))}`}</Text>
            <Text>{`Status: ${_formatStatus(parcelRequest)}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

ParcelRequestListItem.propTypes = {
  parcelRequest: PropTypes.object.isRequired,
};

ParcelRequestListItem.defaultProps = {};

export default ParcelRequestListItem;

const styles = StyleSheet.create({
  parcelRequestListItem: {
    overflow: 'hidden',
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.white,
    elevation: 6,
    shadowColor: Colors.greyShadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  parcelRequestListItemContainer: {
    padding: 10,
    shadowColor: Colors.greyShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginHorizontal: 5,
  },
});
