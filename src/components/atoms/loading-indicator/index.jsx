import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const LoadingIndicator = ({ isLoading, size, containerStyle }) => (
  <View style={[styles.container, styles.horizontal, containerStyle]}>
    <ActivityIndicator animating={isLoading} size={size} />
  </View>
);

LoadingIndicator.propTypes = {
  isLoading: PropTypes.bool,
  size: PropTypes.string,
  containerStyle: PropTypes.object,
};

LoadingIndicator.defaultProps = {
  isLoading: false,
  size: 'small',
  containerStyle: {},
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
