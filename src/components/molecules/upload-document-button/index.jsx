import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import ActionSheet from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import _ from 'lodash';

import { openUserGallery, openUserCamera } from './upload-document-button-utils';
import UploadDocumentSelectionItem from './upload-document-selection-item';
import useTheme from '../../../theme/hooks/useTheme';
import theme from '../../../theme/react-native-elements-theme';
import InputWrapper from '../input-wrapper';

const actionSheetRef = createRef();

const UploadDocumentButton = ({ onImageSelect, errorMessage, label, style, disabled }) => {
  const [documentSelected, setDocumentSelected] = useState(false);

  const openActionSheet = () => actionSheetRef.current.setModalVisible(true);
  const closeActionSheet = () => actionSheetRef.current.setModalVisible(false);

  const _updateFormData = (selectedImage) => {
    onImageSelect({ target: { value: _.get(selectedImage, 'uri') } });
    setDocumentSelected(true);
    closeActionSheet();
  };

  const _handlePhotoLibrary = () => {
    openUserGallery().then(_updateFormData);
  };

  const _handleCamera = () => {
    openUserCamera().then(_updateFormData);
  };
  const insets = useSafeAreaInsets();
  const safeArea = {
    marginBottom: insets.bottom,
  };

  return (
    <>
      <InputWrapper
        label={label}
        errorMessage={errorMessage}
        containerStyle={theme.Input.containerStyle}
      >
        <Button
          onPress={openActionSheet}
          buttonStyle={theme.Input.inputStyle}
          containerStyle={[...style, theme.Input.inputContainerStyle]}
          icon={{
            name: !documentSelected ? 'upload' : 'check',
            type: 'material-community',
            size: 20,
          }}
          disabled={disabled}
        />
      </InputWrapper>
      <ActionSheet ref={actionSheetRef} gestureEnabled>
        <View style={safeArea}>
          <UploadDocumentSelectionItem title="Take Photo" onPress={_handleCamera} />
          <UploadDocumentSelectionItem
            title="Choose Photo From Library"
            onPress={_handlePhotoLibrary}
          />
          <UploadDocumentSelectionItem title="Cancel" onPress={closeActionSheet} />
        </View>
      </ActionSheet>
    </>
  );
};

UploadDocumentButton.propTypes = {
  onImageSelect: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  label: PropTypes.string.isRequired,
  style: PropTypes.array,
  disabled: PropTypes.bool,
};

UploadDocumentButton.defaultProps = {
  errorMessage: '',
  style: [],
  disabled: false,
};

export default UploadDocumentButton;
