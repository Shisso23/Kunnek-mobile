import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import { useTheme } from '../../../theme';
import { UserRating } from '../../../components/atoms';
import ProfilePicture from '../../../components/atoms/profile-picture';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const UserSummaryCard = (props) => {
  const { Fonts, Gutters, Layout, Common } = useTheme();
  const { user } = props;
  const navigation = useNavigation();

  const _goToUserDetails = () => {
    navigation.navigate('UserDetails', props);
  };

  return (
    <TouchableOpacity
      style={[Common.viewCard, Layout.row, Gutters.regularMargin]}
      onPress={_goToUserDetails}
    >
      <ProfilePicture user={user} />
      <View style={Layout.fill}>
        <Text style={[Fonts.tinyTitle, Gutters.smallLMargin]}>{_.get(user, 'fullName')}</Text>
        <View style={Layout.fill} />
        <View style={[Layout.row, Layout.justifyContentBetween, Gutters.smallLMargin]}>
          <Text>Rating</Text>
          <UserRating user={user} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

UserSummaryCard.propTypes = {
  user: PropTypes.object.isRequired,
};

UserSummaryCard.defaultProps = {};

export default UserSummaryCard;
