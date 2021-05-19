import { View } from 'react-native';
import { Text } from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';
import Fonts from '../../../theme/Fonts';

const Index = ({ title }) => {
  const { Gutters, Layout } = useTheme();
  return (
    <View style={[Layout.row, Layout.alignItemsCenter, Gutters.regularHPadding]}>
      <Text h1 style={[Fonts.titleRegular]}>{title}</Text>
    </View>
  );
};

Index.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Index;
