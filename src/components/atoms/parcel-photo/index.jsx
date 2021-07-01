import { Image } from 'react-native-elements';
import { ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Colors } from '../../../theme/Variables';

const ParcelPhoto = ({ parcelRequest, style }) => {
  return (
    <Image
      style={[styles.ParcelPhoto, style]}
      source={{ uri: _.get(parcelRequest, 'photoUri') }}
      PlaceholderContent={<ActivityIndicator color={Colors.white} />}
    />
  );
};

ParcelPhoto.propTypes = {
  parcelRequest: PropTypes.shape({ PhotoUri: PropTypes.string }).isRequired,
  style: PropTypes.object,
};

ParcelPhoto.defaultProps = {};

export default ParcelPhoto;

const styles = StyleSheet.create({
  ParcelPhoto: {
    borderRadius: 3,
    height: 75,
    marginTop: 5,
    width: 75,
  },
});
