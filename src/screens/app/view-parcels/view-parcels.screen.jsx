import React from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import Index from '../../../components/atoms/title';
import { useTheme } from '../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { ParcelDetailsFooter, ViewParcelCard } from '../../../components';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { parcelStatus } from '../../../helpers/parcel-request-status.helper';
import { removeParcelRequest } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import {
  parcelRequestSelector,
  setUserParcelRequestsAction,
} from '../../../reducers/parcel-request-reducer/parcel-request.reducer';

const ViewParcelsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { Layout, Images } = useTheme();
  const { parcelRequest } = route.params;
  const deliverer = _.get(parcelRequest, 'deliverer');
  const thisParcelStatus = _.get(parcelRequest, 'status');
  const { user } = useSelector(userSelector);
  const { userParcelRequests } = useSelector(parcelRequestSelector);
  const dispatch = useDispatch();

  const _isDeliverer = () => {
    return _.get(user, 'id') === _.get(deliverer, 'userId');
  };

  const _canCancel = () => {
    if (!_isDeliverer()) {
      if (parcelStatus[thisParcelStatus] <= parcelStatus['pending_acceptance_from_sender'])
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
    console.log('edit clicked');
    navigation.navigate('EditParcel', parcelRequest);
  };
  const _cancel = () => {
    _.remove(userParcelRequests, (request) => {
      return request === parcelRequest;
    });
    dispatch(removeParcelRequest(_.get(parcelRequest, 'id')))
      .then(navigation.navigate('ParcelRequests'))
      .then(dispatch(setUserParcelRequestsAction(userParcelRequests)));
  };
  const _contact = () => {
    console.log('cancel clicked');
  };

  const _renderFooter = () => {
    var icons = [];

    if (_canCancel()) {
      icons.push({ icon: Images.editIconGreen, caption: `Edit`, onPress: _edit });
      icons.push({ icon: Images.cancelIconOrange, caption: `Cancel`, onPress: _cancel });
    }

    if (_canContact())
      icons.push({ icon: Images.messageIconGreen, caption: `Contact`, onPress: _contact });
    if (icons.length)
      return (
        <ParcelDetailsFooter buttons={icons} style={[icons.length === 1 && styles.footerWidth]} />
      );
    return <></>;
  };

  return (
    <>
      <Index title="View Parcel" />
      <ScrollView style={[Layout.fill]} contentContainerStyle={[styles.fillScreen]}>
        <ViewParcelCard parcelRequest={parcelRequest} />
        {_renderFooter()}
      </ScrollView>
    </>
  );
};

ViewParcelsScreen.propTypes = {
  route: PropTypes.object,
};

ViewParcelsScreen.defaultProps = {};

export default ViewParcelsScreen;

const styles = StyleSheet.create({
  fillScreen: {
    flexGrow: 1,
  },
  footerWidth: {
    alignSelf: 'center',
    width: 150,
  },
});
