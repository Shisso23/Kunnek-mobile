import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';

const ViewCard = ({ children, style }) => {
  const { Common, Gutters, Layout } = useTheme();
  return (
    <View
      style={[
        Common.viewCard,
        Layout.rowCenterSpaceBetween,
        Gutters.regularPadding,
        Gutters.smallBMargin,
        style,
      ]}
    >
      {children}
    </View>
  );
};

ViewCard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ViewCard;
