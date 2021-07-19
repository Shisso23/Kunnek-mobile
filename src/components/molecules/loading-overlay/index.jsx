import React from 'react';
import PropTypes from 'prop-types';
import AnimatedLoader from 'react-native-animated-loader';
import { StyleSheet } from 'react-native';

const LoadingOverlay = ({ isLoading }) => {
  return (
    <AnimatedLoader
      visible={isLoading}
      source={require('../../../assets/animations/loader.json')}
      animationStyle={styles.animationSize}
    />
  );
};

LoadingOverlay.propTypes = {
  isLoading: PropTypes.bool,
};

LoadingOverlay.defaultProps = {
  isLoading: false,
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  animationSize: {
    width: 350,
    height: 150,
  },
});
