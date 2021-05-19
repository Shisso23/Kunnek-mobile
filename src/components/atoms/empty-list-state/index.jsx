import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../../../theme/Variables';
import LoadingIndicator from '../loading-indicator';

const EmptyListState = ({ message, emptyListTextStyle, isLoading }) => {
  if (isLoading) {
    return <LoadingIndicator loading={isLoading} />;
  }

  return (
    <View>
      <Text style={[styles.emptyListTextStyle, emptyListTextStyle]}>{message}</Text>
    </View>
  );
};

EmptyListState.propTypes = {
  isLoading: PropTypes.bool,
  message: PropTypes.string,

  emptyListTextStyle: Text.propTypes.style,
};

EmptyListState.defaultProps = {
  isLoading: false,
  message: 'No items were found.',
  emptyListTextStyle: {},
};

export default EmptyListState;

const styles = StyleSheet.create({
  emptyListTextStyle: {
    color: Colors.black,
    textAlign: 'center',
  },
});
