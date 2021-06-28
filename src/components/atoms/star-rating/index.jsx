import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import { useTheme } from '../../../theme';

const StarRating = ({ value, onStarChange, style = {} }) => {
  const { Layout } = useTheme();
  const starCount = value;
  let count = Number(starCount);

  const _renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const image =
        i < count
          ? require('../../../assets/images/star-fill.png')
          : require('../../../assets/images/star.png');
      stars.push(
        <TouchableOpacity onPress={_setStars(i)} key={i}>
          <Image style={[styles.StarratingStyle, style]} source={image} />
        </TouchableOpacity>,
      );
    }

    return stars;
  };

  const _setStars = (index) => {
    return () => {
      onStarChange(index + 1);
    };
  };

  return <View style={[Layout.row]}>{_renderStars()}</View>;
};

StarRating.propTypes = {
  value: PropTypes.number.isRequired,
  style: PropTypes.object,
  onStarChange: PropTypes.func,
};

StarRating.defaultProps = {
  style: {},
  onStarChange: null,
};

export default StarRating;

const styles = StyleSheet.create({
  StarratingStyle: {
    height: 15,
    width: 15,
  },
});
