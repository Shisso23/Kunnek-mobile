import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import { useTheme } from '../../../theme';
import { UserRating } from '../../../components/atoms';
import ProfilePicture from '../../../components/atoms/profile-picture';

const UserSummaryCard = ({ user }) => {
  const { Fonts, Gutters, Layout, Common } = useTheme();

  return (
    <View style={[Common.viewCard, Layout.row, Gutters.regularMargin]}>
      <ProfilePicture user={user} />
      <View style={Layout.fill}>
        <Text style={[Fonts.tinyTitle, Gutters.smallLMargin]}>{_.get(user, 'fullName')}</Text>
        <View style={Layout.fill} />
        <View style={[Layout.row, Layout.justifyContentBetween, Gutters.smallLMargin]}>
          <Text>Rating</Text>
          <UserRating user={user} />
        </View>
      </View>
    </View>
  );
};

UserSummaryCard.propTypes = {
  user: PropTypes.object,
};

UserSummaryCard.defaultProps = {};

export default UserSummaryCard;
