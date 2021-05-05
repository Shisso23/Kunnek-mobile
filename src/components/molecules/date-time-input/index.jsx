import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import dayjs from 'dayjs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button } from 'react-native-elements';
import theme from '../../../theme/react-native-elements-theme';
import InputWrapper from '../input-wrapper';
import useTheme from '../../../theme/hooks/useTheme';

const DateTimeInput = ({
  value,
  errorMessage,
  label,
  format = 'YYYY-MM-DD',
  mode = 'date',
  onChange,
}) => {
  const { Layout, Custom } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  const getValue = () => {
    const date = dayjs(value);

    return date.format(format);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const onValueChange = (newValue) => {
    if (onChange) {
      toggleModal();
      onChange(getStringValue(newValue));
    }
  };

  const getStringValue = (newValue) => {
    const date = dayjs(newValue);

    return date.format(format);
  };

  const getDateValue = () => {
    let date;
    if (_.isNil(value) || _.isEmpty(value)) {
      date = new Date();
    }

    return dayjs(date).toDate();
  };

  return (
    <>
      <InputWrapper
        label={label}
        errorMessage={errorMessage}
        containerStyle={theme.Input.containerStyle}
      >
        <Button
          onPress={toggleModal}
          title={getValue()}
          buttonStyle={[theme.Input.inputStyle, Layout.alignItemsStart]}
          containerStyle={theme.Input.inputContainerStyle}
          titleStyle={[Custom.buttonTextInput, theme.Input.inputStyle]}
        />
      </InputWrapper>

      <DateTimePickerModal
        isVisible={modalOpen}
        date={getDateValue()}
        mode={mode}
        is24Hour
        display="default"
        onConfirm={onValueChange}
        onCancel={toggleModal}
      />
    </>
  );
};

export default DateTimeInput;

DateTimeInput.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.object,
  format: PropTypes.string,
  mode: PropTypes.string,

  onChange: PropTypes.func.isRequired,
};

DateTimeInput.defaultProps = {
  value: dayjs().format('YYYY-MM-DD'),
  errorMessage: '',
  mode: 'date',
  format: 'YYYY-MM-DD',
};
