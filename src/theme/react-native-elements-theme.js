import { Colors, FontFamily, FontSize } from './Variables';
import Common from './Common';

const theme = {
  colors: {
    primary: Colors.primary,
  },
  Text: {
    style: {
      fontFamily: FontFamily.primary,
      fontSize: FontSize.regular,
    },
    h1Style: {
      fontFamily: FontFamily.secondary,
      fontSize: 30,
    },
    h2style: {
      fontFamily: FontFamily.secondary,
      fontSize: 26,
    },
    h3style: {
      fontFamily: FontFamily.secondary,
      fontSize: 22,
    },
    h4style: {
      fontFamily: FontFamily.secondary,
      fontSize: 18,
    },
  },
  Divider: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },

  Button: {
    titleStyle: {
      fontFamily: FontFamily.secondary,
      fontSize: 20,
      color: Colors.white,
    },
    buttonStyle: {
      borderRadius: 0,
      height: 56,
    },
    containerStyle: {
      marginVertical: 10,
    },
  },
  Input: {
    errorStyle: Common.errorStyle,
    containerStyle: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    inputStyle: {
      backgroundColor: Colors.lightGrey,
      color: Colors.darkGrey,
      height: 56,
      padding: 20,
      fontSize: 14,
    },
    inputContainerStyle: {
      borderBottomWidth: 0,
    },
    placeholderTextColor: Colors.inputPlaceholderColor,
  },
  SearchBar: {
    containerStyle: {
      backgroundColor: Colors.warning,
      paddingLeft: 0,
      paddingRight: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#000',
    },
  },
};

export default theme;
