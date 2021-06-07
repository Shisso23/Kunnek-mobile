import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/Variables';
import { IconButton } from '../../../components/atoms';

const ParcelDetailsFooter = () => {
  const { Gutters, Layout, Common, Images } = useTheme();

  return (
    <>
      <View style={Layout.fill} />
      <View
        style={[
          Layout.row,
          Layout.justifyContentAround,
          Common.viewCard,
          Gutters.regularHMargin,
          Gutters.largeBMargin,
        ]}
      >
        <IconButton icon={Images.sendParcelIconBlue} text="Contact" />
        <View style={styles.verticalDivider} />
        <IconButton icon={Images.deliverParcelIconBlue} text="Track Parcel" />
      </View>
    </>
  );
};

ParcelDetailsFooter.propTypes = {
  item: PropTypes.object,
};

ParcelDetailsFooter.defaultProps = {};

export default ParcelDetailsFooter;

const styles = StyleSheet.create({
  verticalDivider: {
    borderColor: Colors.greyShadow,
    borderLeftWidth: 1,
    height: '95%',
  },
});
