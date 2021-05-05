import _ from 'lodash';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';
import tabBarUtils from './tab-bar.utils';
import { Colors } from '../../../theme/Variables';
import useTheme from '../../../theme/hooks/useTheme';

const RenderTab = ({ route, index, state, onPress }) => {
  const { Layout, Gutters } = useTheme();
  const routeName = _.get(route, 'name');
  const isActive = state.index === index;
  return (
    <TouchableOpacity
      style={[Layout.colCenter, Gutters.regularMargin]}
      key={route.key}
      onPress={() => onPress(routeName)}
    >
      <View>
        <Image source={tabBarUtils.getIcon(routeName)} resizeMode="contain" style={styles.image} />
      </View>
      {isActive && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
  );
};
RenderTab.propTypes = {
  route: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

RenderTab.defaultProps = {
  onPress: () => {},
};
const styles = StyleSheet.create({
  activeIndicator: {
    borderColor: Colors.primary,
    borderWidth: 1,
    width: '40%',
  },
  image: {
    height: 35,
    width: 35,
  },
});
export default RenderTab;
