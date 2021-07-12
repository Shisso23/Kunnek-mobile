import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Alert, StyleSheet } from 'react-native';
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
import { checkParcelRequestAction } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import { useInterval } from '../../../services';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { Linking } from 'react-native';

const ParcelDetailsScreen = ({ route }) => {
  const { Layout, Images } = useTheme();
  const parcelRequest = route.params;
  const deliverer = _.get(parcelRequest, 'deliverer');
  const parcelStatusIndex = parcelStatus[_.get(parcelRequest, 'status')];
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [parcelRequestUpdated, updateParcelRequest] = useState(parcelRequest);
  const navigation = useNavigation();

  useInterval(() => {
    dispatch(checkParcelRequestAction(_.get(parcelRequestUpdated, 'id'))).then((response) => {
      if (_.get(response, 'status') !== _.get(parcelRequestUpdated, 'status')) {
        updateParcelRequest(response);
      }
    });
  }, 5000);

  const _isDeliverer = () => {
    return _.get(user, 'id') === _.get(deliverer, 'userId');
  };

  const _getOtherUser = () => {
    if (_isDeliverer()) {
      return _.get(parcelRequest, 'sender');
    }

    return _.get(parcelRequest, 'deliverer');
  };

  const _dialReceiver = () => {
    let phone;
    if (Platform.OS !== 'android') {
      phone = `telprompt:${_.get(parcelRequest, 'receiverMobileNumber', '')}`;
    } else {
      phone = `tel:${_.get(parcelRequest, 'receiverMobileNumber', '')}`;
    }
    Linking.openURL(phone)
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
    if (parcelStatusIndex >= parcelStatus['pending_acceptance_from_sender']) {
      var icons = [];

      icons.push({
        icon: Images.messageIconGreen,
        caption: `Contact ${_isDeliverer() ? 'Sender' : ''}`,
        onPress: () => {
          navigation.navigate('Chat', { parcelRequest });
        },
      });
      if (_isDeliverer()) {
        icons.push({
          icon: Images.messageIconBlue,
          caption: 'Contact Recipient',
          onPress: _dialReceiver,
        });
      } else {
        icons.push({ icon: Images.mapIcon, caption: 'Track Parcel' });
      }
      return <ParcelDetailsFooter buttons={icons} />;
    }
  };

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
  route: PropTypes.object.isRequired,
};

ParcelDetailsScreen.defaultProps = {};

export default ParcelDetailsScreen;

const styles = StyleSheet.create({
  fillScreen: {
    flexGrow: 1,
  },
});
