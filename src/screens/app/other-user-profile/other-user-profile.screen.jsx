import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native-elements';
import _ from 'lodash';

import useTheme from '../../../theme/hooks/useTheme';
import ParallaxView from '../../../components/molecules/parallax-view';
import { IdNumber, ReviewsList, VehiclesList } from '../../../components';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme/Variables';
import { useDispatch } from 'react-redux';
import { progressPackageStatus } from '../../../helpers/parcel-request-status.helper';
import {
  cancelParcelStatus,
  getParcelRequestAction,
  updateParcelStatus,
} from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import { getPublicReviewsAction } from '../../../reducers/reviews-reducer/reviews.actions';
import { userModel } from '../../../models';

const OtherUserProfileScreen = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(_.get(route, 'params.user', userModel()));
  const [parcelRequest, setParcelRequest] = useState(_.get(route, 'params.parcelRequest'));
  const { Common, Layout } = useTheme();
  const [reviews, setReviews] = useState([]);
  const vehicle = _.get(user, 'vehicle', undefined);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (typeof parcelRequest === 'string') {
      dispatch(getParcelRequestAction(parcelRequest)).then((parcelObject) => {
        setParcelRequest(parcelObject);
        const driver = _.get(parcelObject, 'deliverer');
        setUser(driver);
        dispatch(getPublicReviewsAction(driver)).then((apiResponse) => {
          setReviews(apiResponse);
          setLoading(false);
        });
      });
    } else {
      dispatch(getPublicReviewsAction(user)).then((apiResponse) => {
        setReviews(apiResponse);
        setLoading(false);
      });
    }
  }, []);

  const _renderApproval = () => {
    if (parcelRequest) {
      return (
        <SafeAreaView style={Layout.center}>
          <Button containerStyle={styles.buttonStyle} onPress={_accept} title="Accept" />
          <Button
            containerStyle={styles.buttonStyle}
            buttonStyle={styles.clearButtonStyle}
            onPress={_reject}
            titleStyle={[styles.clearButtonTextStyle]}
            title="Reject"
          />
        </SafeAreaView>
      );
    }
  };

  const _accept = () => {
    const newStatus = progressPackageStatus(parcelRequest);
    dispatch(updateParcelStatus(parcelRequest, newStatus)).then((updatedParcelRequest) => {
      navigation.navigate('ParcelDetails', { parcelRequest: updatedParcelRequest });
    });
  };

  const _reject = () => {
    dispatch(cancelParcelStatus(parcelRequest)).then((updatedParcelRequest) => {
      navigation.navigate('ParcelDetails', { parcelRequest: updatedParcelRequest });
    });
  };

  return loading ? null : (
    <ParallaxView user={user}>
      <View style={[Common.bottomDrawer]}>
        <View style={[Layout.rowCenterSpaceBetween]}>
          <Text h1>{user.fullName}</Text>
        </View>

        <SafeAreaView>
          <View>
            <IdNumber item={user} />
            <VehiclesList items={vehicle ? [vehicle] : null} readOnly />
            <ReviewsList items={reviews} readOnly />
          </View>
        </SafeAreaView>
        <View style={[Layout.fill]} />
        {_renderApproval()}
      </View>
    </ParallaxView>
  );
};

OtherUserProfileScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

OtherUserProfileScreen.defaultProps = {};

export default OtherUserProfileScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '90%',
  },
  clearButtonStyle: {
    backgroundColor: Colors.transparent,
  },
  clearButtonTextStyle: {
    color: Colors.darkerGrey,
  },
});
