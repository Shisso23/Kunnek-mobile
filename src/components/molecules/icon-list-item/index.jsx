import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';
import StatusButton from '../../atoms/status-button';

const IconListItem = ({ icon, title, description, date, divider, activeMessage, action }) => {
  const { Gutters, Layout, Fonts } = useTheme();

  return (
    <>
      <View style={[Layout.row, Gutters.tinyHPadding, styles.leftAlign]}>
        <View style={Gutters.smallPaddingRight}>
          <Image source={icon} style={styles.iconSize} />
        </View>
        <View style={[Layout.fill, Gutters.smallLMargin]}>
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            <Text style={[Fonts.titleTiny, styles.noBold]}>{title}</Text>
            <Text style={styles.lightText}>{date}</Text>
          </View>
          <Text>{description}</Text>
          {divider && <View style={styles.horizontalDivider} />}
        </View>
      </View>
      <View style={[Layout.colVCenter]}>
        {!_.isNil(activeMessage) && !_.isEmpty(activeMessage) && (
          <StatusButton status={activeMessage} color={Colors.primary} action={action} />
        )}
      </View>
    </>
  );
};

IconListItem.propTypes = {
  icon: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  date: PropTypes.string,
  divider: PropTypes.bool,
  activeMessage: PropTypes.string,
  action: PropTypes.func,
};

IconListItem.defaultProps = {
  description: '',
  date: '',
  divider: false,
  activeMessage: '',
};

export default IconListItem;

const styles = StyleSheet.create({
  noBold: {
    fontWeight: 'normal',
  },
  leftAlign: {
    alignSelf: 'flex-start',
  },
  horizontalDivider: {
    marginTop: 8,
    borderColor: Colors.greyShadow,
    borderBottomWidth: 1,
    width: '95%',
  },
  iconSize: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  lightText: {
    color: Colors.inputPlaceholderColor,
  },
});
