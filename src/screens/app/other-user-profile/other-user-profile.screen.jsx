import React from 'react';
import PropTypes from 'prop-types';
import { View, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import _ from 'lodash';

import useTheme from '../../../theme/hooks/useTheme';
import ParallaxView from '../../../components/molecules/parallax-view';
import { Button, IdNumber, VehiclesList } from '../../../components';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme/Variables';

const OtherUserProfileScreen = ({ route }) => {
  const { user, approval } = route.params;
  const { Common, Layout } = useTheme();
  const vehicle = _.get(user, 'vehicle', undefined);

  const _renderApproval = () => {
    if (approval) {
      return (
        <>
          <Button style={[styles.buttonStyle]} onPress={() => {}}>
            Accept
          </Button>
          <Button
            style={[styles.buttonStyle, styles.clearButtonStyle]}
            textStyle={[styles.clearButtonTextStyle]}
            onPress={() => {}}
          >
            Reject
          </Button>
        </>
      );
    }
  };

  return (
    <ParallaxView user={user}>
      <View style={[Common.bottomDrawer]}>
        <View style={[Layout.rowCenterSpaceBetween]}>
          <Text h1>{user.fullName}</Text>
        </View>

        <SafeAreaView>
          <View>
            <IdNumber item={user} />
            <VehiclesList items={vehicle ? [vehicle] : null} readOnly />
            {/* <ReviewsList items={reviews} /> */}
          </View>
        </SafeAreaView>
      </View>
      <View style={[Layout.fill]} />
      {_renderApproval()}
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
