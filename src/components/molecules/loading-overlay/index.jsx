import React from 'react';
import PropTypes from 'prop-types';
import AnimatedLoader from 'react-native-animated-loader';

const LoadingOverlay = ({ isLoading }) => {
  return (
    <AnimatedLoader
      visible={isLoading}
      source={require('../../../assets/animations/loader.json')}
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
