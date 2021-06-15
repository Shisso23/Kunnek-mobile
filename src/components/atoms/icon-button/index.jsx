import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useTheme from '../../../theme/hooks/useTheme';

const IconButton = ({ icon, text }) => {
  const { Common, Layout, Gutters } = useTheme();
  return (
    <TouchableOpacity style={[Layout.center, Gutters.largeVPadding, Gutters.smallHPadding]}>
      <Image source={icon} style={styles.iconSize} />
      <Text style={[Common.centerText]}>{text}</Text>
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  icon: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  iconSize: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});

export default IconButton;
