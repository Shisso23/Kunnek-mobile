import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const ChatBottomDrawer = ({ onPress }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} />
    </>
  );
};

ChatBottomDrawer.propTypes = {
  onPress: PropTypes.func,
};

ChatBottomDrawer.defaultProps = {
  onPress: () => {},
};

export default ChatBottomDrawer;
