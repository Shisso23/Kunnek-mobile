import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/Variables';
import { IconButton } from '../../../components/atoms';

const ParcelDetailsFooter = (props) => {
  const { Gutters, Layout, Common } = useTheme();
  const { buttons, style } = props;
  const _renderButtons = _.map(buttons, (button, index) => {
    return (
      <React.Fragment key={index}>
        {index > 0 && <View style={styles.verticalDivider} />}
        <IconButton
          icon={_.get(button, 'icon')}
          text={_.get(button, 'caption')}
          onPress={_.get(button, 'onPress')}
        />
      </React.Fragment>
    );
  });

  return (
    <>
      <View style={Layout.fill} />
      <SafeAreaView>
        <View
          style={[
            Layout.row,
            Layout.justifyContentAround,
            Common.viewCard,
            Gutters.regularHMargin,
            Gutters.largeBMargin,
            buttons.length === 1 ? styles.singleButtonStyle : styles.multipleButtonsStyle,
            style,
          ]}
        >
          {_renderButtons}
        </View>
      </SafeAreaView>
    </>
  );
};

ParcelDetailsFooter.propTypes = {
  props: PropTypes.object,
  buttons: PropTypes.array.isRequired,
  style: PropTypes.array,
};

ParcelDetailsFooter.defaultProps = {
  props: {},
  style: [],
};

export default ParcelDetailsFooter;

const styles = StyleSheet.create({
  verticalDivider: {
    borderColor: Colors.greyShadow,
    borderLeftWidth: 1,
    height: '95%',
  },
  multipleButtonsStyle: {
    flexShrink: 1,
  },
  singleButtonStyle: {
    width: 150,
  },
});
