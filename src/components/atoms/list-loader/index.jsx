import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import Loading from '../loading-indicator';

const ListLoader = ({ message, isLoading, isEmpty, children, containerStyle }) => {
  if (isLoading && isEmpty) {
    return (
      <View style={[containerStyle]}>
        <Loading message={message} />
      </View>
    );
  }

  return <>{children}</>;
};

ListLoader.propTypes = {
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  isEmpty: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  containerStyle: ViewPropTypes.style,
};

ListLoader.defaultProps = {
  message: 'Loading Data',
  isLoading: false,
  isEmpty: false,
  children: [],
  containerStyle: {},
};

export default ListLoader;
