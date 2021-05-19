import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';

import { useTheme } from '../../../theme';

const LoadingIndicator = ({ isLoading, size, containerStyle }) => {
  const { Gutters, Layout } = useTheme();
  return (
    <View style={[Layout.row, Layout.justifyContentAround, Gutters.smallPadding, containerStyle]}>
      <ActivityIndicator animating={isLoading} size={size} />
    </View>
  );
};

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
