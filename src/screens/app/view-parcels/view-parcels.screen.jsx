import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useSelector } from 'react-redux';

import Index from '../../../components/atoms/title';
import { useTheme } from '../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { ParcelDetailsFooter, ViewParcelCard } from '../../../components';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';

const ViewParcelsScreen = ({ route }) => {
  const { Layout, Images } = useTheme();
  const { parcelRequest } = route.params;
  const deliverer = _.get(parcelRequest, 'deliverer');
  const { user } = useSelector(userSelector);

  const _isDeliverer = () => {
    return _.get(user, 'id') === _.get(deliverer, 'userId');
  };

  const _renderFooter = () => {
    var icons = [];

    icons.push({ icon: Images.messageIconGreen, caption: `Contact` });
    return <ParcelDetailsFooter buttons={icons} style={styles.footerWidth} />;
  };
  return (
    <>
      <Index title="View Parcel" />
      <ScrollView style={[Layout.fill]} contentContainerStyle={[styles.fillScreen]}>
        <ViewParcelCard parcelRequest={parcelRequest} />
        {_isDeliverer() && _renderFooter()}
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
