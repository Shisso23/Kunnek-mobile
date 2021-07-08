import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { List, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Avatar, Image } from 'react-native-elements';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';

const IMAGE_HEIGHT = 270;
const ParallaxView = ({ children, user, editable }) => {
  const { Colors, Gutters } = useTheme();
  const navigation = useNavigation();

  const renderForeground = () => (
    <>
      <Image
        style={{ height: IMAGE_HEIGHT }}
        source={{ uri: user.profilePictureUri }}
        PlaceholderContent={<ActivityIndicator color={Colors.white} />}
      />
    </>
  );

  const editButton = () => {
    if (editable)
      return (
        <IconButton
          icon={() => <Icon name="pencil-alt" color={Colors.black} size={20} />}
          onPress={() => navigation.navigate('EditProfile')}
        />
      );
    return null;
  };

  const renderStickyHeader = () => (
    <List.Item
      title={user.fullName}
      style={([Gutters.regularMargin], { backgroundColor: Colors.white })}
      left={() => <Avatar rounded size={50} source={{ uri: user.profilePictureUri }} />}
      right={editButton}
    />
  );

  return (
    <>
      <ParallaxScrollView
        parallaxHeaderHeight={IMAGE_HEIGHT}
        backgroundColor={Colors.transparent}
        contentBackgroundColor={Colors.lightGrey}
        renderForeground={renderForeground}
        renderStickyHeader={renderStickyHeader}
        stickyHeaderHeight={90}
        contentContainerStyle={{ backgroundColor: Colors.grey }}
      >
        <View>{children}</View>
      </ParallaxScrollView>
    </>
  );
};

ParallaxView.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  editable: PropTypes.bool,
};

ParallaxView.defaultProps = {
  editable: false,
};

export default ParallaxView;
