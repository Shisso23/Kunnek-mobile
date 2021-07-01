import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { useTheme } from '../../../theme';

const PaperContainer = (props) => {
  const { Gutters, Layout, Common } = useTheme();
  const { children, style, ...rest } = props;
  return (
    <View
      style={[Layout.justifyContentBetween, Common.viewCard, Gutters.regularMargin, style]}
      {...rest}
    >
      {children}
    </View>
  );
};

PaperContainer.propTypes = {
  children: PropTypes.array.isRequired,
  style: PropTypes.array,
};

PaperContainer.defaultProps = {
  style: [],
};

export default PaperContainer;
