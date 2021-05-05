import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const Index = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

Index.propTypes = {};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Index;
