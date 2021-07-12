import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Linking } from 'react-native';
import { CheckBox, Text } from 'react-native-elements';
import useTheme from '../../../theme/hooks/useTheme';
import config from '../../../config';

const TermsAndConditions = ({ checked, onPress }) => {
  const { Common, Colors, Layout } = useTheme();

  const _openTermsAndConditions = () => {
    Linking.openURL(config.termsAndConditionsUrl);
  };

  return (
    <View style={[Layout.row, Layout.alignItemsCenter]}>
      <CheckBox
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={checked}
        onPress={onPress}
        checkedColor={Colors.primary}
      />
      <Text>I agree to the</Text>
      <TouchableOpacity delayPressIn={0} onPress={_openTermsAndConditions}>
        <Text style={[Common.link]}> Terms and Conditions</Text>
      </TouchableOpacity>
    </View>
  );
};

TermsAndConditions.propTypes = {
  checked: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default TermsAndConditions;
