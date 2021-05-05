import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { List, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Avatar, Image } from 'react-native-elements';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';

const IMAGE_HEIGHT = 270;
const ParallaxView = ({ children, user }) => {
  const { Colors, Gutters } = useTheme();

  const renderForeground = () => (
    <>
      <Image
        style={{ height: IMAGE_HEIGHT }}
        source={{ uri: user.profilePictureUri }}
        PlaceholderContent={<ActivityIndicator color={Colors.white} />}
      />
    </>
  );

  const renderStickyHeader = () => (
    <List.Item
      title={user.fullName}
      style={([Gutters.regularMargin], { backgroundColor: Colors.white })}
      left={() => <Avatar rounded size={50} source={{ uri: user.profilePictureUri }} />}
      right={() => (
        <IconButton
          icon={() => <Icon name="pencil-alt" color={Colors.black} size={20} />}
          onPress={() => {}}
        />
      )}
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
};

export default ParallaxView;
