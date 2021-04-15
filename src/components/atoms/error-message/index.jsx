import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../../../theme/Variables';

/**
 *
 */
const Error = ({ message }) => {
  if (!message) {
    return null;
  }

  return <Text style={[styles.errorStyle]}>{message}</Text>;
};

Error.propTypes = {
  message: PropTypes.string,
};

Error.defaultProps = {
  message: null,
};

export default Error;

const styles = StyleSheet.create({
  errorStyle: {
    color: Colors.error,
  },
});
