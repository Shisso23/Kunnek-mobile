import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { useTheme } from '../../../theme';
import { parcelStatusSender } from '../../../helpers/parcel-request.helper';
import IconListItem from '../icon-list-item';
import { progressPackageStatus } from '../../../helpers/parcel-request-status.helper';
import { updateParcelStatus } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
const ParcelStatusCardSender = ({ parcelRequest }) => {
  const { Gutters, Layout, Common, Images } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const parcelStatusDecoded = parcelStatusSender(parcelRequest);

  const _buttonClick = () => {
    const newStatus = progressPackageStatus(parcelRequest);
    dispatch(updateParcelStatus(parcelRequest, newStatus));
  };

  const _driverReview = () => {
    navigation.navigate('UserDetails', {
      user: _.get(parcelRequest, 'deliverer'),
      parcelRequest: parcelRequest,
    });
  };

  const _viewParcel = () => {
    navigation.navigate('ViewParcel', { parcelRequest });
  };

  const _reviewUser = () => {
    navigation.navigate('Review', { parcelRequest });
  };

  return (
    <View style={[Common.viewCard, Layout.colVCenter, Gutters.regularMargin]}>
      <IconListItem
        icon={_.get(parcelStatusDecoded.status, 'icon') ? Images.timerBlue : Images.timer}
        title={_.get(parcelStatusDecoded.status, 'title')}
        description={_.get(parcelStatusDecoded.status, 'description')}
        activeMessage={_.get(parcelStatusDecoded.status, 'interaction')}
        date={_.get(parcelStatusDecoded.status, 'date')}
        divider={true}
        action={_.get(parcelStatusDecoded.status, 'action') ? _viewParcel : _driverReview}
      />
      <IconListItem
        icon={_.get(parcelStatusDecoded.pickUp, 'icon') ? Images.truckBlue : Images.truck}
        title={_.get(parcelStatusDecoded.pickUp, 'title')}
        description={_.get(parcelStatusDecoded.pickUp, 'description')}
        activeMessage={_.get(parcelStatusDecoded.pickUp, 'interaction')}
        divider={true}
        action={_buttonClick}
      />
      <IconListItem
        icon={_.get(parcelStatusDecoded.delivery, 'icon') ? Images.truckBlue : Images.truck}
        title={_.get(parcelStatusDecoded.delivery, 'title')}
        description={_.get(parcelStatusDecoded.delivery, 'description')}
        activeMessage={_.get(parcelStatusDecoded.delivery, 'interaction')}
        divider={true}
        action={_buttonClick}
      />
      <IconListItem
        icon={
          _.get(parcelStatusDecoded.review, 'icon') ? Images.writeCommentBlue : Images.writeComment
        }
        title={_.get(parcelStatusDecoded.review, 'title')}
        description={_.get(parcelStatusDecoded.review, 'description')}
        activeMessage={_.get(parcelStatusDecoded.review, 'interaction')}
        action={_reviewUser}
      />
    </View>
  );
};

ParcelStatusCardSender.propTypes = {
  parcelRequest: PropTypes.object.isRequired,
  action: PropTypes.func,
};

ParcelStatusCardSender.defaultProps = {
  action: null,
};

ParcelStatusCardSender.defaultProps = {};

export default ParcelStatusCardSender;
