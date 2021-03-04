import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  isLastFilledCell,
  MaskSymbol,
} from 'react-native-confirmation-code-field';

import { useTheme } from '../../../theme';

const NumericInput = ({ value, onChange, cellCount, handleSubmit, errorMessage, ...rest }) => {
  const { Common, Colors, Fonts } = useTheme();
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: onChange,
  });

  return (
    <>
      <CodeField
        ref={ref}
        {...props}
        {...rest}
        value={value}
        onChangeText={onChange}
        onBlur={handleSubmit}
        keyboardType="number-pad"
        renderCell={({ index, symbol, isFocused }) => {
          let textChild = null;

          if (symbol) {
            textChild = (
              <MaskSymbol maskSymbol="*" isLastFilledCell={isLastFilledCell({ index, value })}>
                {symbol}
              </MaskSymbol>
            );
          } else if (isFocused) {
            textChild = <Cursor />;
          }

          return (
            <View
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
              style={[styles.cell, isFocused && styles.focusCell]}
            >
              <Text style={[styles.cellText, Fonts.textCenter, { color: Colors.black }]}>
                {textChild}
              </Text>
            </View>
          );
        }}
      />
      {errorMessage && <Text style={Common.errorStyle}>{errorMessage}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderBottomWidth: 1,
    height: 40,
    width: 40,
  },
  cellText: {
    fontSize: 25,
  },
});

NumericInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  cellCount: PropTypes.number.isRequired,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

NumericInput.defaultProps = {
  errorMessage: null,
};
export default NumericInput;
