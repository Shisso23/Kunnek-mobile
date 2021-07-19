import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import _ from 'lodash';

import useTheme from '../../../theme/hooks/useTheme';

const StatusBox = ({ status, color }) => {
  const { Common } = useTheme();
  return (
    <View style={[styles.box, { backgroundColor: color }]}>
      <Text style={[Common.centerWhiteText]}>{_.upperFirst(status)}</Text>
    </View>
  );
};

StatusBox.propTypes = {
  color: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  box: {
    borderRadius: 5,
    padding: 10,
    width: 100,
  },
});

export default StatusBox;
