import React from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import Index from '../../../components/atoms/title';
import { useTheme } from '../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Button, ParcelDetailsFooter, ViewParcelCard } from '../../../components';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { parcelStatus, progressPackageStatus } from '../../../helpers/parcel-request-status.helper';
import {
  removeParcelRequest,
  updateParcelStatus,
} from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import {
  parcelRequestSelector,
  setUserParcelRequestsAction,
} from '../../../reducers/parcel-request-reducer/parcel-request.reducer';
import { View } from 'react-native';

const ViewParcelScreen = ({ route }) => {
  const navigation = useNavigation();
  const { Layout, Images } = useTheme();
  const { parcelRequest } = route.params;
  const sender = _.get(parcelRequest, 'sender');
  const deliverer = _.get(parcelRequest, 'deliverer');
  const thisParcelStatus = _.get(parcelRequest, 'status');
  const { user } = useSelector(userSelector);
  const { userParcelRequests } = useSelector(parcelRequestSelector);
  const dispatch = useDispatch();

  const _isSender = () => {
    return _.get(user, 'id') === _.get(sender, 'userId');
  };

  const _canCancel = () => {
    if (_isSender()) {
      if (parcelStatus[thisParcelStatus] < parcelStatus['pending_acceptance_from_sender'])
        return true;
    }
    return false;
  };

  const _canContact = () => {
    if (
      parcelStatus[thisParcelStatus] >= parcelStatus['pending_acceptance_from_sender'] &&
      parcelStatus[thisParcelStatus] < parcelStatus['completed_delivery']
    )
      return true;
  };

  const _edit = () => {
    navigation.navigate('EditParcel', parcelRequest);
  };

  const _cancel = () => {
    _.remove(userParcelRequests, (request) => {
      return request.id === parcelRequest.id;
    });
    dispatch(removeParcelRequest(_.get(parcelRequest, 'id')))
      .then(navigation.navigate('ParcelRequests'))
      .then(dispatch(setUserParcelRequestsAction(userParcelRequests)));
  };

  const _contact = () => {
    navigation.navigate('Chat', { parcelRequest: parcelRequest });
  };

  const _deliveryRequest = () => {
    const newStatus = progressPackageStatus(parcelRequest);
    dispatch(updateParcelStatus(parcelRequest, newStatus));
    navigation.navigate('ParcelRequests');
  };

  const _renderFooter = () => {
    let icons = [];

    if (_canCancel()) {
      icons.push({ icon: Images.editIconGreen, caption: `Edit`, onPress: _edit });
      icons.push({ icon: Images.cancelIconOrange, caption: `Cancel`, onPress: _cancel });
    }

    if (_canContact()) {
      icons.push({ icon: Images.messageIconGreen, caption: `Contact`, onPress: _contact });
    }

    if (icons.length)
      return (
        <ParcelDetailsFooter buttons={icons} style={[icons.length === 1 && styles.footerWidth]} />
      );
    return null;
  };

  const _RequestToDeliver = () => {
    if (!_canCancel() && !_.get(deliverer, 'id')) {
      return (
        <>
          <View style={[Layout.fill]} />
          <SafeAreaView>
            <Button style={[styles.buttonStyle]} onPress={_deliveryRequest}>
              Request to deliver
            </Button>
          </SafeAreaView>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <Index title="View Parcel" />
      <ScrollView style={[Layout.fill]} contentContainerStyle={[styles.fillScreen]}>
        <ViewParcelCard parcelRequest={parcelRequest} />
        {_renderFooter()}
        {_RequestToDeliver()}
      </ScrollView>
    </>
  );
};

ViewParcelScreen.propTypes = {
  route: PropTypes.object,
};

export default ViewParcelScreen;

const styles = StyleSheet.create({
  fillScreen: {
    flexGrow: 1,
  },
  footerWidth: {
    alignSelf: 'center',
    width: 150,
  },
  buttonStyle: {
    width: '90%',
    marginBottom: 20,
  },
});
