import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import Index from '../../../components/atoms/title';
import { getParcelRequestsAction } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import { useTheme } from '../../../theme';
import ParcelRequestListItem from '../../../components/molecules/parcel-request-list-item';
import ParcelFilterFormModal from '../../../components/molecules/parcel-filter/parcel-filter-form-modal';

const ParcelRequestScreen = () => {
  const { Fonts, Gutters, Layout } = useTheme();
  const { parcelRequests = [] } = useSelector((state) => state.parcelRequestReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParcelRequestsAction({ for_current_user: true }));
  }, []);

  const _renderItem = ({ item }) => {
    return <ParcelRequestListItem parcelRequest={item} />;
  };

  return (
    <View style={[Layout.fill]}>
      <Index title="My Parcels" />
      <Text style={[Fonts.textLarge, Gutters.regularHPadding]}>See your current orders.</Text>
      <FlatList
        keyExtractor={(item) => {
          return _.get(item, 'id');
        }}
        data={parcelRequests}
        renderItem={_renderItem}
      />
      <ParcelFilterFormModal visible={true} />
    </View>
  );
};

ParcelRequestScreen.propTypes = {
  item: PropTypes.object,
};

ParcelRequestScreen.defaultProps = {};

export default ParcelRequestScreen;
