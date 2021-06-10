import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { useTheme } from '../../../theme';

const PaperContainer = ({ children }) => {
  const { Gutters, Layout, Common } = useTheme();
  return (
    <View style={[Layout.justifyContentBetween, Common.viewCard, Gutters.regularMargin]}>
      {children}
    </View>
  );
};

PaperContainer.propTypes = {
  children: PropTypes.object,
};

PaperContainer.defaultProps = {};

export default PaperContainer;
