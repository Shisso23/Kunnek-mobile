import React, { useEffect, useState } from 'react';
import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Platform } from 'react-native';

import { exitAppOnHardwarePressListener } from '../../../helpers';
import { getParcelRequestsAction } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import CustomHeaderButton from '../../../components/atoms/custom-header-button';
import { CustomTab, LoadingOverlay, MapViewComponent } from '../../../components';
import ParcelFilterFormModal from '../../../components/molecules/parcel-filter/parcel-filter-overlay';
import { useTheme } from '../../../theme';

const HomeScreen = () => {
  useFocusEffect(exitAppOnHardwarePressListener);
  const dispatch = useDispatch();
  const [filterVisible, setFilterVisible] = useState(false);
  const navigation = useNavigation();
  const { parcelRequests, parcelRequestLoading = false } = useSelector(
    (reducers) => reducers.parcelRequestReducer,
  );
  const { Layout } = useTheme();

  const closeFilters = () => {
    setFilterVisible(false);
  };

  useEffect(() => {
    _loadParcelRequests();
  }, []);

  useEffect(() => {}, [parcelRequests]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {},
    });
  }, [navigation]);

  const _loadParcelRequests = () => {
    dispatch(getParcelRequestsAction({ is_open: true }));
  };

  const _onPressMapMarker = (parcelRequest) => {
    navigation.navigate('ViewParcel', {
      parcelRequest,
    });
  };

  const _openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const _openFilters = () => {
    setFilterVisible(true);
  };

  const _isLoading = () => {
    return parcelRequestLoading;
  };

  const _customHeader = (props) => {
    return (
      <View style={[Layout.row, Layout.justifyContentBetween, styles.header]}>
        <CustomHeaderButton
          {...props}
          onPress={_openDrawer}
          image={require('../../../assets/icons/menu/menu.png')}
        />
        <CustomHeaderButton
          {...props}
          onPress={_openFilters}
          image={require('../../../assets/icons/filter/filter.png')}
        />
      </View>
    );
  };

  return (
    <>
      <LoadingOverlay isLoading={_isLoading()} />
      <MapViewComponent parcelRequests={parcelRequests} onPointPress={_onPressMapMarker} />
      <View style={styles.navContainer}>
        <CustomTab />
      </View>
      <ParcelFilterFormModal visible={filterVisible} setFilterClosed={closeFilters} />
      {_customHeader()}
      <View style={styles.refreshButton}>
        <CustomHeaderButton
          onPress={_loadParcelRequests}
          image={require('../../../assets/icons/refresh/refresh.png')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    bottom: 50,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  refreshButton: {
    position: 'absolute',
    right: 0,
    top: Platform.OS === 'ios' ? 110 : 60,
    zIndex: 1,
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: Platform.OS === 'ios' ? 50 : 10,
    zIndex: 1,
  },
});

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

export default HomeScreen;
