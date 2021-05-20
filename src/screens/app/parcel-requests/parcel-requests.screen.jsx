import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Index from '../../../components/atoms/title';
import { getParcelRequestsAction } from '../../../reducers/parcel-request-reducer/parcel-request.actions';

const ParcelRequestScreen = () => {
  const { parcelRequests = [] } = useSelector((state) => state.parcelRequestReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParcelRequestsAction({ for_current_user: true }));
  }, []);

  return (
    <View>
      <Index title="My Parcels" />
      <Text>{JSON.stringify(parcelRequests)}</Text>
    </View>
  );
};

ParcelRequestScreen.propTypes = {};

ParcelRequestScreen.defaultProps = {};

export default ParcelRequestScreen;
