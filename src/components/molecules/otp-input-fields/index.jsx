import React, { useState, useEffect, useMemo, createRef } from 'react';
import { View, TextInput, StyleSheet, Pressable, Platform, Text } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';

const OTPInputField = ({ length, value, onChange, error, ...props }) => {
  const { Layout } = useTheme();
  const refs = useMemo(
    () =>
      Array(length)
        .fill(0)
        .map(() => createRef()),
    [],
  );
  const [otp, setOtp] = useState(value);

  useEffect(() => {
    if (value !== otp) {
      setOtp(value);
    }
  }, [otp, value]);

  const _onKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace') {
      if (index > 0) {
        refs[index - 1].current.focus();
      }
    } else {
      if (index < length - 1) {
        refs[index + 1].current.focus();
      }
    }
  };

  const _onChangeText = (value, index) => {
    const left = otp.substr(0, index);
    const right = otp.substr(index + 1);
    const newOtp = left + value + right;
    if (Platform.OS === 'android' && newOtp.length > otp.length) {
      _onKeyPress({ nativeEvent: { key: value } }, index);
    }
    setOtp(newOtp);
    onChange(newOtp);
  };

  const _onFieldPress = () => {
    if (otp.length === length) {
      refs[otp.length - 1].current.focus();
    } else {
      refs[otp.length].current.focus();
    }
  };

  const _OTPFieldMap = _.map(refs, (ref, index) => {
    return (
      <View pointerEvents={'none'} key={`${index}`}>
        <TextInput
          ref={ref}
          style={[styles.textInput]}
          maxLength={1}
          value={otp[index]}
          onKeyPress={(event) => _onKeyPress(event, index)}
          onChangeText={(value) => _onChangeText(value, index)}
          keyboardType={'number-pad'}
          {...props}
        />
      </View>
    );
  });

  return (
    <View>
      <Pressable onPress={_onFieldPress}>
        <View style={[Layout.rowCenterSpaceBetween]}>{_OTPFieldMap}</View>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

OTPInputField.propTypes = {
  length: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

OTPInputField.defaultProps = {
  error: '',
};

export default OTPInputField;

const styles = StyleSheet.create({
  textInput: {
    borderColor: Colors.greyShadow,
    borderWidth: 1,
    width: 55,
    height: 55,
    borderRadius: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
  },
  error: {
    color: Colors.error,
  },
});
