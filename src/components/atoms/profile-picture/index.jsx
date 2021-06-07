import { Image } from 'react-native-elements';
import { ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Colors } from '../../../theme/Variables';

const ProfilePicture = ({ user }) => {
  return (
    <>
      <Image
        style={styles.profilePicture}
        source={{ uri: _.get(user, 'profilePictureUri') }}
        PlaceholderContent={<ActivityIndicator color={Colors.white} />}
      />
    </>
  );
};

ProfilePicture.propTypes = {
  user: PropTypes.shape({ profilePictureUri: PropTypes.string }).isRequired,
};

ProfilePicture.defaultProps = {};

export default ProfilePicture;

const styles = StyleSheet.create({
  profilePicture: {
    borderRadius: 5,
    height: 60,
    width: 60,
  },
});
