import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { exitAppOnHardwarePressListener } from '../../../helpers';
import { CustomTab } from '../../../components/molecules';
import { MapViewComponent } from '../../../components';
import { locationService } from '../../../services';
import { getTripsAction } from '../../../reducers/trip-reducer/trip.actions';
import { getParcelRequestsAction } from '../../../reducers/parcel-request-reducer/parcel-request.actions';

const HomeScreen = () => {
  useFocusEffect(exitAppOnHardwarePressListener);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { parcelRequests } = useSelector((reducers) => reducers.parcelRequestReducer);
  const { trips } = useSelector((reducers) => reducers.tripReducer);
  const [startPoint, setStartPoint] = useState({});
  const [endPoint, setEndPoint] = useState({});

  useEffect(() => {
    dispatch(getTripsAction({ for_current_user: 'true' })).then(() => {
      dispatch(getParcelRequestsAction({ is_open: true })).then(() => {
        const tripLocations = _.get(_.nth(trips, 0), 'locations', []);
        setStartPoint(locationService.getCoordinateFromType('start', tripLocations));
        setEndPoint(locationService.getCoordinateFromType('end', tripLocations));
      });
    });
  }, []);

  const _onPressMapMarker = (parcelRequest) => {
    navigation.navigate('ViewParcel', {
      parcelRequest,
    });
  };

  return (
    <>
      <MapViewComponent
        parcelRequests={parcelRequests}
        startPoint={startPoint}
        endPoint={endPoint}
        onPointPress={_onPressMapMarker}
      />
      <View style={styles.navContainer}>
        <CustomTab />
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
});

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

export default HomeScreen;
