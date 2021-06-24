import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useTheme from '../../../theme/hooks/useTheme';

const IconButton = ({ icon, text, onPress }) => {
  const { Common, Layout, Gutters } = useTheme();
  return (
    <TouchableOpacity
      style={[Layout.center, Gutters.largeVPadding, Gutters.smallHPadding]}
      onPress={onPress}
    >
      <Image source={icon} style={[styles.iconSize, Gutters.smallBMargin]} />
      <Text style={[Common.centerText]}>{text}</Text>
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  icon: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  iconSize: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default IconButton;
