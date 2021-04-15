import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes } from 'react-native';

import Error from '../../atoms/error-message';
import Label from '../../atoms/label';

const InputWrapper = ({
  label,
  required,
  errorMessage,
  children,
  containerStyle,
  inputContainerStyle,
  labelStyle,
}) => (
  <View style={[styles.containerStyle, containerStyle]}>
    <Label required={required} label={label} labelStyle={labelStyle} />
    <View style={[styles.inputContainerStyle, inputContainerStyle]}>{children}</View>
    <Error message={errorMessage} />
  </View>
);

InputWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  labelStyle: PropTypes.object,
};

InputWrapper.defaultProps = {
  children: [],
  required: false,
  errorMessage: null,
  containerStyle: {},
  inputContainerStyle: {},
  labelStyle: {},
};

export default InputWrapper;

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 10,
    width: '100%',
  },
  inputContainerStyle: {
    fontSize: 16,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingTop: 10,
  },
});
