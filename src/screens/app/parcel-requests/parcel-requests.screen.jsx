import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import Index from '../../../components/atoms/title';
import { getParcelRequestsAction } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import { useTheme } from '../../../theme';
import ParcelRequestListItem from '../../../components/molecules/parcel-request-list-item';
import { ButtonGroup } from 'react-native-elements/dist/buttons/ButtonGroup';
import { Colors } from '../../../theme/Variables';
import { activeParcelParams } from '../../../helpers/parcel-request-status.helper';

const ParcelRequestScreen = () => {
  const { Fonts, Gutters, Layout } = useTheme();
  const [buttonIndex, setButtonIndex] = useState(0);
  const { parcelRequests = [] } = useSelector((state) => state.parcelRequestReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParcelRequestsAction({ for_current_user: true }));
  }, []);

  const buttons = ['all parcels', 'active parcels only'];

  const _changefilter = (newIndex) => {
    setButtonIndex(newIndex);
    if (buttons[newIndex] === 'all parcels') {
      dispatch(getParcelRequestsAction({ for_current_user: true }));
    } else {
      dispatch(getParcelRequestsAction({ for_current_user: true, status: activeParcelParams() }));
    }
  };

  const _renderItem = ({ item }) => {
    return <ParcelRequestListItem parcelRequest={item} />;
  };

  return (
    <View style={[Layout.fill]}>
      <Index title="My Parcels" />
      <Text style={[Fonts.textLarge, Gutters.regularHPadding]}>See your current orders.</Text>
      <ButtonGroup
        buttons={buttons}
        selectedIndex={buttonIndex}
        onPress={_changefilter}
        selectedButtonStyle={styles.selectedButtonStyle}
      />
      <FlatList
        keyExtractor={(item) => {
          return _.get(item, 'id').toString();
        }}
        data={parcelRequests}
        renderItem={_renderItem}
      />
    </View>
  );
};

ParcelRequestScreen.propTypes = {
  item: PropTypes.object,
};

ParcelRequestScreen.defaultProps = {};

export default ParcelRequestScreen;

const styles = StyleSheet.create({
  selectedButtonStyle: {
    backgroundColor: Colors.primary,
  },
});
