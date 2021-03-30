import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { exitAppOnHardwarePressListener } from '../../../helpers';
import { CustomTab } from '../../../components/molecules';

const HomeScreen = () => {
  useFocusEffect(exitAppOnHardwarePressListener);

  return (
    <View style={styles.navContainer}>
      <CustomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    bottom: 50,
    left: 0,
    position: 'absolute',
    right: 0,
  },
});

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

export default HomeScreen;
