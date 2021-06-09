import React from 'react';
import { useSelector } from 'react-redux';
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

const ParcelDetailsScreen = ({ route }) => {
  const { Layout } = useTheme();
  const parcelRequest = route.params;
  const deliverer = _.get(parcelRequest, 'deliverer');
  const parcelStatusIndex = parcelStatus[_.get(parcelRequest, 'status')];
  const { user } = useSelector(userSelector);

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

  return (
    <>
      <Index title="Parcel Details" />
      <ScrollView style={[Layout.fill]} contentContainerStyle={styles.fillScreen}>
        {_renderDetailsCard()}
        <ParcelDetailsCard parcelRequest={parcelRequest} />
        {parcelStatusIndex >= 4 && <UserSummaryCard user={_getOtherUser()} />}
        {parcelStatusIndex >= 2 && <ParcelDetailsFooter />}
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
