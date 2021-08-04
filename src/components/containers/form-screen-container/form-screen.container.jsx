import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ViewPropTypes } from 'react-native';
import { useTheme } from '../../../theme';

const { Layout } = useTheme();

const FormScreenContainer = ({ children, contentContainerStyle }) => (
  <KeyboardAwareScrollView
    contentContainerStyle={[Layout.scrollFlex, contentContainerStyle]}
    keyboardShouldPersistTaps="handled"
  >
    {children}
  </KeyboardAwareScrollView>
);

FormScreenContainer.propTypes = {
  children: PropTypes.node.isRequired,
  contentContainerStyle: ViewPropTypes.style,
};

FormScreenContainer.defaultProps = {
  contentContainerStyle: {},
};

export default FormScreenContainer;
