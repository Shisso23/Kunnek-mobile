import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';

const TagPanel = ({ userRole }) => {
  const { Layout } = useTheme();
  return (
    <View
      style={[
        styles.TagPanel,
        Layout.rowCenter,
        userRole == 'Sender' ? styles.SenderColor : styles.DriverColor,
      ]}
    >
      <Text style={[styles.TagText]}>{userRole}</Text>
    </View>
  );
};

TagPanel.propTypes = {
  userRole: PropTypes.string,
};

TagPanel.defaultProps = {};

export default TagPanel;

const styles = StyleSheet.create({
  TagPanel: {
    borderRadius: 8,
    height: 25,
    width: 85,
    marginTop: 5,
  },
  SenderColor: {
    backgroundColor: Colors.primary,
  },
  DriverColor: {
    backgroundColor: Colors.darkTangerine,
  },
  TagText: {
    color: Colors.white,
  },
});
