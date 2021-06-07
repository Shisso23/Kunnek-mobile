import { View } from 'react-native';
import { Text } from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';

const Index = ({ title }) => {
  const { Gutters, Layout, Fonts, Common } = useTheme();
  return (
    <View style={[Layout.row, Layout.alignItemsCenter, Gutters.regularHPadding]}>
      <Text style={[Fonts.titleRegular, Common.noBold]}>{title}</Text>
    </View>
  );
};

Index.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Index;
