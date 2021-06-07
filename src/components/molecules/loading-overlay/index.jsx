import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Overlay } from 'react-native-elements';
import { useTheme } from '../../../theme';

const LoadingOverlay = ({ isLoading, message }) => {
  const { Fonts, Layout } = useTheme();
  return (
    <Overlay isVisible={isLoading}>
      <View style={[Layout.fill, Layout.alignItemsCenter, Layout.justifyContentCenter]}>
        <ActivityIndicator size="large" />
        <Text style={[Fonts.textCenter]}>{message}</Text>
      </View>
    </Overlay>
  );
};

LoadingOverlay.propTypes = {
  isLoading: PropTypes.bool,
  message: PropTypes.string,
};

LoadingOverlay.defaultProps = {
  isLoading: false,
  message: 'Loading...',
};

export default LoadingOverlay;
