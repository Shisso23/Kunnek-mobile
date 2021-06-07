import TouchableItem from '@react-navigation/drawer/src/views/TouchableItem';
import { Image, Platform } from 'react-native';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '../../../theme';

const CustomHeaderButton = ({
  headerLeftAccessibilityLabel,
  tintColor,
  image,
  headerPressColorAndroid,
  onPress,
}) => {
  const { Custom } = useTheme();

  return (
    <TouchableItem
      accessible
      accessibilityRole="button"
      accessibilityComponentType="button"
      accessibilityLabel={headerLeftAccessibilityLabel}
      accessibilityTraits="button"
      delayPressIn={0}
      onPress={onPress}
      style={Custom.headerButton}
      pressColor={headerPressColorAndroid}
      hitSlop={Platform.select({
        ios: undefined,
        default: { top: 16, right: 16, bottom: 16, left: 16 },
      })}
      borderless
    >
      <Image
        style={[Custom.headerButtonIcon, tintColor ? { tintColor } : null]}
        source={image}
        fadeDuration={0}
      />
    </TouchableItem>
  );
};

CustomHeaderButton.propTypes = {
  headerLeftAccessibilityLabel: PropTypes.string,
  headerPressColorAndroid: PropTypes.string,
  tintColor: PropTypes.string,
  image: PropTypes.number,
  onPress: PropTypes.func,
};

CustomHeaderButton.defaultProps = {
  headerLeftAccessibilityLabel: '',
  headerPressColorAndroid: '',
  image: 0,
  tintColor: '',
  onPress: () => {},
};

export default CustomHeaderButton;
