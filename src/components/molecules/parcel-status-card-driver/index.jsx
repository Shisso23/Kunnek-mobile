import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';

import { useTheme } from '../../../theme';
import { parcelStatusDeliverer } from '../../../helpers/parcel-request.helper';
import IconListItem from '../icon-list-item';
import { useDispatch, useSelector } from 'react-redux';
import { progressPackageStatus } from '../../../helpers/parcel-request-status.helper';
import {
  cancelParcelStatus,
  updateParcelStatus,
} from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import {
  parcelRequestSelector,
  setUserParcelRequestsAction,
} from '../../../reducers/parcel-request-reducer/parcel-request.reducer';

const ParcelStatusCardDriver = ({ parcelRequest }) => {
  const { Gutters, Layout, Common, Images } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userParcelRequests } = useSelector(parcelRequestSelector);

  const parcelStatusDecoded = parcelStatusDeliverer(parcelRequest);

  const _buttonClick = () => {
    const newStatus = progressPackageStatus(parcelRequest);
    return dispatch(updateParcelStatus(parcelRequest, newStatus));
  };

  const _renderOTP = () => {
    if (_.get(parcelRequest, 'status') === 'pending_delivery') {
      navigation.navigate('OTP', { parcelRequest });
    } else {
      _buttonClick().then((job) => {
        navigation.navigate('OTP', { parcelRequest: job });
      });
    }
  };

  const _cancelRequest = () => {
    dispatch(cancelParcelStatus(parcelRequest, true)).then(() => {
      _.remove(userParcelRequests, (request) => {
        return request.id === parcelRequest.id;
      });
      dispatch(setUserParcelRequestsAction(userParcelRequests));
      navigation.goBack();
    });
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
        action={_cancelRequest}
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
        action={_renderOTP}
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

ParcelStatusCardDriver.propTypes = {
  parcelRequest: PropTypes.object.isRequired,
  action: PropTypes.func,
};

ParcelStatusCardDriver.defaultProps = {
  action: null,
};

ParcelStatusCardDriver.defaultProps = {};

export default ParcelStatusCardDriver;
