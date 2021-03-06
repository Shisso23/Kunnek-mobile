import React from 'react';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

const UploadDocumentSelectionItem = ({ title, onPress }) => (
  <ListItem bottomDivider onPress={onPress}>
    <ListItem.Content>
      <ListItem.Title>{title}</ListItem.Title>
    </ListItem.Content>
  </ListItem>
);

UploadDocumentSelectionItem.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

UploadDocumentSelectionItem.defaultProps = {};

export default UploadDocumentSelectionItem;
