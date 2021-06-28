import { Text, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '../../../theme';
import { StarRating } from '../../atoms';

const ReviewItem = ({ value, onChange, title }) => {
  const { Layout, Gutters, Fonts } = useTheme();
  return (
    <View style={[Layout.row, Layout.fill, Layout.justifyContentBetween, Gutters.smallVMargin]}>
      <Text style={[Fonts.secondaryRegular]}>{title}</Text>
      <StarRating value={value} onStarChange={onChange} />
    </View>
  );
};

ReviewItem.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

ReviewItem.defaultProps = {};

export default ReviewItem;
