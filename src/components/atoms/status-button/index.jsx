import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useTheme from '../../../theme/hooks/useTheme';

const StatusButton = ({ status, color }) => {
  const { Common, Layout, Gutters } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.box,
        Layout.center,
        Gutters.smallVMargin,
        Gutters.smallHPadding,
        { backgroundColor: color },
      ]}
    >
      <Text style={[Common.centerWhiteText]}>{status}</Text>
    </TouchableOpacity>
  );
};

StatusButton.propTypes = {
  color: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  box: {
    borderRadius: 12,
    minWidth: 100,
    height: 30,
  },
});

export default StatusButton;
