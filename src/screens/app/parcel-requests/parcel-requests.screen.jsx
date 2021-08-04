import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { ButtonGroup } from 'react-native-elements';
import PropTypes from 'prop-types';
import { useIsFocused } from '@react-navigation/native';

import Index from '../../../components/atoms/title';
import {
  checkUserParcelRequestsAction,
  getUserParcelRequestsAction,
} from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import { useTheme } from '../../../theme';
import ParcelRequestListItem from '../../../components/molecules/parcel-request-list-item';
import { Colors } from '../../../theme/Variables';
import { activeParcelParams } from '../../../helpers/parcel-request-status.helper';
import { useInterval } from '../../../services';

const ParcelRequestScreen = () => {
  const { Layout } = useTheme();
  const [buttonIndex, setButtonIndex] = useState(0);
  const { userParcelRequests = [] } = useSelector((state) => state.parcelRequestReducer);
  const dispatch = useDispatch();
  const isFocussed = useIsFocused();

  useEffect(() => {
    dispatch(getUserParcelRequestsAction(_requestParams()));
  }, []);

  const buttons = ['active parcels only', 'all parcels'];
  const _requestParams = () => {
    if (buttons[buttonIndex] === 'all parcels') {
      return { for_current_user: true };
    }
    return { for_current_user: true, status: activeParcelParams() };
  };

  const _changefilter = (newIndex) => {
    if (!(buttonIndex === newIndex)) {
      setButtonIndex(newIndex);
      if (buttons[newIndex] === 'all parcels') {
        dispatch(getUserParcelRequestsAction({ for_current_user: true }));
      } else {
        dispatch(
          getUserParcelRequestsAction({ for_current_user: true, status: activeParcelParams() }),
        );
      }
    }
  };

  useInterval(() => {
    if (isFocussed) dispatch(checkUserParcelRequestsAction(_requestParams()));
  }, 5000);

  const _renderItem = ({ item }) => {
    return <ParcelRequestListItem parcelRequest={item} />;
  };

  return (
    <View style={[Layout.fill]}>
      <Index title="My Parcels" />
      <ButtonGroup
        buttons={buttons}
        selectedIndex={buttonIndex}
        onPress={_changefilter}
        selectedButtonStyle={styles.selectedButtonStyle}
        selectedTextStyle={styles.selectedTextStyle}
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
      />
      <FlatList
        keyExtractor={(item) => {
          return _.get(item, 'id').toString();
        }}
        data={userParcelRequests}
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
  selectedTextStyle: {
    color: Colors.white,
  },
  buttonStyle: {
    backgroundColor: Colors.white,
  },
  textStyle: {
    color: Colors.black,
  },
});
