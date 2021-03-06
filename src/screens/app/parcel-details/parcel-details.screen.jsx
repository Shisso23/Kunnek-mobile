import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Alert, StyleSheet, Platform, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

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
import {
  checkParcelRequestAction,
  getParcelRequestAction,
} from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import { useInterval } from '../../../services';
import { parcelRequestSelector } from '../../../reducers/parcel-request-reducer/parcel-request.reducer';
import { useEffect } from 'react';

const ParcelDetailsScreen = ({ route }) => {
  const { Layout, Images } = useTheme();
  const { parcelRequest } = route.params;
  const deliverer = _.get(parcelRequest, 'deliverer');
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [parcelRequestUpdated, updateParcelRequest] = useState(parcelRequest);
  const parcelStatusIndex = parcelStatus[_.get(parcelRequestUpdated, 'status')];
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof parcelRequest === 'string') {
      dispatch(getParcelRequestAction(parcelRequest)).then((response) => {
        navigation.setParams({ parcelRequest: response });
        updateParcelRequest(response);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const { userParcelRequests } = useSelector(parcelRequestSelector);

  useInterval(() => {
    const requestId = _.get(parcelRequestUpdated, 'id');
    const parcelExists = _.find(userParcelRequests, (parcel) => parcel.id === requestId);
    if (parcelExists) {
      dispatch(checkParcelRequestAction(requestId)).then((response) => {
        if (_.get(response, 'status') !== _.get(parcelRequestUpdated, 'status')) {
          updateParcelRequest(response);
        }
      });
    }
  }, 1000);

  const _isDeliverer = () => {
    return _.get(user, 'id') === _.get(deliverer, 'userId');
  };

  const _getOtherUser = () => {
    if (_isDeliverer()) {
      return _.get(parcelRequestUpdated, 'sender');
    }

    return _.get(parcelRequestUpdated, 'deliverer');
  };

  const _dialReceiver = () => {
    let phone;
    if (Platform.OS !== 'android') {
      phone = `telprompt:${_.get(parcelRequestUpdated, 'receiverMobileNumber', '')}`;
    } else {
      phone = `tel:${_.get(parcelRequestUpdated, 'receiverMobileNumber', '')}`;
    }
    Linking.canOpenURL(phone)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phone);
        }
      })
      .catch((err) => console.warn(err));
  };

  const _renderDetailsCard = () => {
    if (_isDeliverer()) return <ParcelStatusCardDriver parcelRequest={parcelRequestUpdated} />;
    return <ParcelStatusCardSender parcelRequest={parcelRequestUpdated} />;
  };

  const _renderOtherUser = () => {
    if (parcelStatusIndex >= parcelStatus['accepted_by_sender'])
      return <UserSummaryCard user={_getOtherUser()} />;
  };

  const _renderFooter = () => {
    if (
      parcelStatusIndex >= parcelStatus['pending_acceptance_from_sender'] &&
      parcelStatusIndex < parcelStatus['completed_delivery']
    ) {
      var icons = [];

      icons.push({
        icon: Images.messageIconGreen,
        caption: `Contact ${_isDeliverer() ? 'Sender' : ''}`,
        onPress: () => {
          navigation.navigate('Chat', { parcelRequest: parcelRequestUpdated });
        },
      });
      if (_isDeliverer()) {
        icons.push({
          icon: Images.messageIconBlue,
          caption: 'Contact Recipient',
          onPress: _dialReceiver,
        });
      } else {
        // icons.push({ icon: Images.mapIcon, caption: 'Track Parcel' }); keeping the code to impliment this when parcel tracking as a feature needs to be implimented
      }
      return <ParcelDetailsFooter buttons={icons} style={[styles.footerWidth]} />;
    }
  };

  return loading ? null : (
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
  route: PropTypes.object.isRequired,
};

ParcelDetailsScreen.defaultProps = {};

export default ParcelDetailsScreen;

const styles = StyleSheet.create({
  fillScreen: {
    flexGrow: 1,
  },
  footerWidth: {
    alignSelf: 'center',
  },
});
