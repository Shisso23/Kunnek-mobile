import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { HelperText, Menu, TextInput, List } from 'react-native-paper';
import { Dimensions, StyleSheet, Platform } from 'react-native';

import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';
import _ from 'lodash';

const { width } = Dimensions.get('window');

const DropdownSelect = ({
  items,
  value,
  onChange,
  keyExtractor,
  valueExtractor,
  error,
  placeholder,
  errorStyle,
  disabled,
  label,
  onBlur,
  contentStyle,
}) => {
  const [visible, setVisible] = useState(false);
  const textRef = useRef(null);
  const hide = () => {
    setVisible(false);
    textRef.current.blur();
    onBlur();
  };
  const show = () => setVisible(true);
  const { Common, Colors } = useTheme();

  const hitSlop = { top: 10, bottom: 10, left: 320, right: 10 };

  const _handleChange = (newItem) => {
    hide();
    onChange(newItem);
  };

  const renderListItem = (item, index) => (
    <List.Item
      key={keyExtractor(item, index)}
      onPress={() => _handleChange(item, index)}
      title={valueExtractor(item, index)}
      style={{ width: width * 0.92 }}
      titleNumberOfLines={5}
    />
  );
  return (
    <Menu
      visible={visible}
      onDismiss={hide}
      style={styles.menu}
      contentStyle={contentStyle}
      anchor={
        <>
          <TextInput
            label={value || visible ? label : placeholder}
            ref={textRef}
            underlineColor={Colors.transparent}
            style={[Common.textInput, styles.textInputExtraStyle]}
            onChangeText={() => null}
            editable={false}
            value={value}
            placeholder={placeholder}
            showSoftInputOnFocus={false}
            onFocus={show}
            error={!!error}
            right={
              <TextInput.Icon
                name="arrow-right"
                disabled={disabled}
                color={Colors.darkGrey}
                size={18}
                onPress={show}
                autoFocus={false}
                hitSlop={hitSlop}
              />
            }
          />

          <HelperText style={errorStyle} type="error" visible={!!error}>
            {error}
          </HelperText>
        </>
      }
    >
      {_.map(items, renderListItem)}
    </Menu>
  );
};

DropdownSelect.propTypes = {
  items: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  keyExtractor: PropTypes.func,
  valueExtractor: PropTypes.func,
  error: PropTypes.string,
  errorStyle: PropTypes.any,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  contentStyle: PropTypes.object,
};

DropdownSelect.defaultProps = {
  items: [],
  onChange: () => {},
  keyExtractor: (item) => item.id,
  valueExtractor: (item) => item.label,
  error: null,
  errorStyle: {},
  placeholder: '',
  value: '',
  label: '',
  disabled: false,
  onBlur: () => {},
  contentStyle: {},
};

export default DropdownSelect;

const styles = StyleSheet.create({
  menu: {
    ...Platform.select({
      android: { elevation: 3, backgroundColor: Colors.white },
      ios: {},
    }),
    marginTop: '12%',
    shadowOffset: {
      height: 0.2,
      width: 0.2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  textInputExtraStyle: {
    backgroundColor: Colors.white,
    elevation: 9,
    borderRadius: 12,
    borderTopEndRadius: 12,
    borderTopLeftRadius: 12,
    borderWidth: 0,
    height: 41,
    marginBottom: 0,
    marginTop: 8,
    minHeight: 30,
    shadowOffset: {
      height: 0.2,
      width: 0.2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    textAlign: 'left',
  },
});
