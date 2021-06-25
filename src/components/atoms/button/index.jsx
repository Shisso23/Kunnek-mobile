import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useTheme from '../../../theme/hooks/useTheme';

const Button = (props) => {
  const { Common, Layout, Gutters, Colors } = useTheme();
  const { children, style, textStyle, ...rest } = props;

  return (
    <TouchableOpacity
      style={[
        styles.box,
        Layout.center,
        Gutters.smallVMargin,
        Gutters.smallHPadding,
        { backgroundColor: Colors.primary },
        style,
      ]}
      {...rest}
    >
      <Text style={[Common.centerWhiteText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.array,
  textStyle: PropTypes.array,
};

Button.defaultProps = {
  style: [],
  textStyle: [],
};

const styles = StyleSheet.create({
  box: {
    minWidth: 120,
    height: 60,
    alignSelf: 'center',
  },
});

export default Button;
