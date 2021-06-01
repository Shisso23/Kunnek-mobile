import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Chip, Text } from 'react-native-elements';

import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/Variables';
import ProfilePicture from '../../atoms/profile-picture';
import UserRating from '../../atoms/user-rating';
import { formatDate } from '../../../helpers/date.helper';

const ParcelRequestListItem = ({ parcelRequest }) => {
  const { Fonts, Gutters, Layout } = useTheme();
  const { user } = useSelector(userSelector);
  const sender = _.get(parcelRequest, 'sender');
  const deliverer = _.get(parcelRequest, 'deliverer');

  const _isDeliverer = () => {
    return _.get(user, 'id') === _.get(deliverer, 'userId');
  };

  const _isSender = () => {
    return _.get(user, 'id') === _.get(sender, 'userId');
  };

  const _getTitle = () => {
    return _.get(_getOtherUser(), 'fullName');
  };

  const _getOtherUser = () => {
    if (_isDeliverer()) {
      return sender;
    }

    return deliverer;
  };

  console.log(_getOtherUser());

  return (
    <>
      <View style={[styles.parcelRequestListItemContainer]}>
        <View style={[styles.parcelRequestListItem, Layout.row, Layout.justifyContentBetween]}>
          <ProfilePicture user={_getOtherUser()} />
          <View style={[Gutters.smallHMargin]}>
            <View>
              <Text style={Fonts.titleSmall}>{_getTitle()}</Text>
              <UserRating user={_getOtherUser()} />
            </View>
            <View>
              <Text>{_.get(parcelRequest, 'description')}</Text>
              <Text>{`R ${_.get(parcelRequest, 'price')}`}</Text>
              <Text>{`Pick-up: ${_.get(parcelRequest, 'pickUpAddress')}`}</Text>
              <Text>{`Drop-off: ${_.get(parcelRequest, 'dropOffAddress')}`}</Text>
              <Text>{`Due date: ${formatDate(
                _.get(parcelRequest, 'latestDeliveryDateTime'),
              )}`}</Text>
              <Text>{`Status: ${_.get(parcelRequest, 'status')}`}</Text>
            </View>
          </View>
          <View>
            <Chip title={_isDeliverer() ? 'Driver' : 'Sender'} />
          </View>
        </View>
      </View>
    </>
  );
};

ParcelRequestListItem.propTypes = {
  parcelRequest: PropTypes.object,
};

ParcelRequestListItem.defaultProps = {};

export default ParcelRequestListItem;

const styles = StyleSheet.create({
  parcelRequestListItem: {
    borderColor: Colors.greyShadow,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 10,
  },
  parcelRequestListItemContainer: {
    padding: 10,
    shadowColor: Colors.greyShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});
