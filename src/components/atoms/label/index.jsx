import React from 'react';
import { StyleSheet, Text, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Colors } from '../../../theme/Variables';

const Label = ({ label, required = true, labelStyle, requiredStyle, theme }) => {
  if (!label) {
    return null;
  }

  return (
    <Text style={[styles.labelStyle, _.get(theme, 'Input.labelStyle'), labelStyle]}>
      {label}
      &nbsp;
      {required && (
        <Text style={[styles.requiredStyle, _.get(theme, 'Label.requiredStyle'), requiredStyle]}>
          *
        </Text>
      )}
    </Text>
  );
};

Label.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,

  requiredStyle: ViewPropTypes.style,
  labelStyle: PropTypes.object,
};

Label.defaultProps = {
  required: false,
  requiredStyle: {},
  labelStyle: {},
};

export default Label;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  requiredStyle: {
    color: Colors.error,
  },
});
