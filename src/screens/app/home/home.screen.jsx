import React, { useEffect, useState } from 'react';
import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import { exitAppOnHardwarePressListener } from '../../../helpers';
import { getParcelRequestsAction } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import CustomHeaderButton from '../../../components/atoms/custom-header-button';
import { CustomTab, LoadingOverlay, MapViewComponent } from '../../../components';
import ParcelFilterFormModal from '../../../components/molecules/parcel-filter/parcel-filter-overlay';

const HomeScreen = () => {
  useFocusEffect(exitAppOnHardwarePressListener);
  const dispatch = useDispatch();
  const [filterVisible, setFilterVisible] = useState(false);
  const navigation = useNavigation();
  const { parcelRequests, parcelRequestLoading = false } = useSelector(
    (reducers) => reducers.parcelRequestReducer,
  );

  const closeFilters = () => {
    setFilterVisible(false);
  };

  useEffect(() => {
    _loadParcelRequests();
  }, []);

  useEffect(() => {}, [parcelRequests]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <CustomHeaderButton
          {...props}
          onPress={_openDrawer}
          image={require('../../../assets/icons/menu/menu.png')}
        />
      ),
      headerRight: (props) => (
        <CustomHeaderButton
          {...props}
          onPress={_openFilters}
          image={require('../../../assets/icons/filter/filter.png')}
        />
      ),
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

  return (
    <>
      <View style={styles.refreshButton}>
        <CustomHeaderButton
          onPress={_loadParcelRequests}
          image={require('../../../assets/icons/refresh/refresh.png')}
        />
      </View>
      <LoadingOverlay isLoading={_isLoading()} />
      <MapViewComponent parcelRequests={parcelRequests} onPointPress={_onPressMapMarker} />
      <View style={styles.navContainer}>
        <CustomTab />
      </View>
      <ParcelFilterFormModal visible={filterVisible} setFilterClosed={closeFilters} />
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
    top: 110,
    zIndex: 1,
  },
});

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

export default HomeScreen;
