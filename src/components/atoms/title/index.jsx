import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';

const Index = ({ title }) => {
  const { Gutters, Layout, Fonts } = useTheme();
  return (
    <View style={[Layout.row, Layout.alignItemsCenter, Gutters.regularHPadding]}>
      <Text style={[Fonts.titleRegular, styles.noBold]}>{title}</Text>
    </View>
  );
};

Index.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Index;

const styles = StyleSheet.create({
  noBold: {
    fontWeight: 'normal',
  },
});
