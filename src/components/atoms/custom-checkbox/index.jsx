import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { CheckBox, Text } from 'react-native-elements';
import useTheme from '../../../theme/hooks/useTheme';

const CustomCheckbox = ({ checked, onPress, text }) => {
  const { Colors, Layout } = useTheme();
  return (
    <View style={[Layout.row, Layout.alignItemsCenter]}>
      <CheckBox
        checkedIcon="check-circle"
        uncheckedIcon="times-circle"
        checked={checked}
        onPress={onPress}
        checkedColor={Colors.primary}
      />
      <Text>{text}</Text>
    </View>
  );
};

CustomCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default CustomCheckbox;
