import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Index from '../../../components/atoms/title';
import { useTheme } from '../../../theme';
import {
  ParcelDetailsCard,
  ParcelDetailsFooter,
  ParcelStatusCardDriver,
  ParcelStatusCardSender,
  UserSummaryCard,
} from '../../../components';
import { parcelStatus } from '../../../helpers/parcel-request-status.helper';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { parcelRequestSelector } from '../../../reducers/parcel-request-reducer/parcel-request.reducer';
import { getActionId } from '../../../reducers/parcel-request-reducer/parcel-request.actions';

const ParcelDetailsScreen = ({ route }) => {
  const { Layout, Images } = useTheme();
  const parcelRequest = route.params;
  const deliverer = _.get(parcelRequest, 'deliverer');
  const parcelStatusIndex = parcelStatus[_.get(parcelRequest, 'status')];
  const { user } = useSelector(userSelector);
  const { parcelRequests } = useSelector(parcelRequestSelector);
  const dispatch = useDispatch();

  const _isDeliverer = () => {
    return _.get(user, 'id') === _.get(deliverer, 'userId');
  };

  const _getOtherUser = () => {
    if (_isDeliverer()) {
      return _.get(parcelRequest, 'sender');
    }

    return _.get(parcelRequest, 'deliverer');
  };

  const _renderDetailsCard = () => {
    if (_isDeliverer()) return <ParcelStatusCardDriver parcelRequest={parcelRequest} />;
    return <ParcelStatusCardSender parcelRequest={parcelRequest} />;
  };

  const _renderOtherUser = () => {
    if (parcelStatusIndex >= parcelStatus['accepted_by_sender'])
      return <UserSummaryCard user={_getOtherUser()} />;
  };

  const _renderFooter = () => {
    if (parcelStatusIndex >= parcelStatus['pending_acceptance_from_sender']) {
      var icons = [];

      icons.push({
        icon: Images.messageIconGreen,
        caption: `Contact ${_isDeliverer() ? 'Sender' : ''}`,
      });
      if (_isDeliverer()) {
        icons.push({ icon: Images.messageIconBlue, caption: 'Contact Recipient' });
      } else {
        icons.push({ icon: Images.mapIcon, caption: 'Track Parcel' });
      }
      return <ParcelDetailsFooter buttons={icons} />;
    }
  };

  useEffect(() => {
    _renderDetailsCard();
  }, [parcelRequests]);

  useEffect(() => {
    dispatch(getActionId(parcelRequest));
  }, []);

  return (
    <>
      <Index title="Parcel Details" />
      <ScrollView style={[Layout.fill]} contentContainerStyle={styles.fillScreen}>
        {_renderDetailsCard()}
        <ParcelDetailsCard parcelRequest={parcelRequest} />
        {_renderOtherUser()}
        {_renderFooter()}
      </ScrollView>
    </>
  );
};

ParcelDetailsScreen.propTypes = {
  route: PropTypes.object,
};

ParcelDetailsScreen.defaultProps = {};

export default ParcelDetailsScreen;

const styles = StyleSheet.create({
  fillScreen: {
    flexGrow: 1,
  },
});
