import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { useTheme } from '../../../theme';

const UserRating = ({ user, onStarChange, style = {} }) => {
  const { Layout } = useTheme();
  const starCount = _.get(user, 'rating', 0);
  let count = Number(starCount);

  const _renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const image =
        i < count
          ? require('../../../assets/images/star-fill.png')
          : require('../../../assets/images/star.png');
      stars.push(
        <TouchableOpacity onPress={onStarChange ? () => onStarChange(i + 1) : null} key={i}>
          <Image style={[styles.ratingStyle, style]} source={image} />
        </TouchableOpacity>,
      );
      count--;
    }

    return stars;
  };

  return <View style={Layout.row}>{_renderStars()}</View>;
};

UserRating.propTypes = {
  user: PropTypes.object.isRequired,
  style: PropTypes.object,
  onStarChange: PropTypes.func,
};

UserRating.defaultProps = {
  user: {},
  style: {},
  onStarChange: null,
};

export default UserRating;

const styles = StyleSheet.create({
  ratingStyle: {
    height: 20,
    width: 20,
  },
});
