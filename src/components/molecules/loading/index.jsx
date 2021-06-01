import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

Loading.propTypes = {};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    zIndex: 1,
  },
});

export default Loading;
