import { Dimensions } from 'react-native';
import { Colors, FontFamily, FontSize } from './Variables';
import Common from './Common';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

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
    h2Style: {
      fontFamily: FontFamily.secondary,
      fontSize: 26,
    },
    h3Style: {
      fontFamily: FontFamily.secondary,
      fontSize: 22,
    },
    h4Style: {
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
      paddingLeft: 5,
      paddingRight: 5,
      shadowColor: Colors.greyShadow,
      shadowRadius: 4,
      shadowOpacity: 0.5,
      shadowOffset: { width: 0, height: 6 },
    },
    inputStyle: {
      backgroundColor: Colors.white,
      color: Colors.darkGrey,
      height: 56,
      padding: 20,
      fontSize: 14,
    },
    inputContainerStyle: {
      borderWidth: 1,
      borderRadius: 10,
      overflow: 'hidden',
      borderColor: Colors.greyShadow,
    },
    labelStyle: {
      color: Colors.darkGrey,
      fontWeight: '400',
      paddingBottom: 5,
    },
    placeholderTextColor: Colors.inputPlaceholderColor,
  },
  SearchBar: {
    containerStyle: {
      backgroundColor: '#fff',
      paddingLeft: 0,
      paddingRight: 0,
      borderBottomWidth: 0,
    },
  },
  Overlay: {
    overlayStyle: {
      height: height / 1.3,
      width: width / 1.3,
    },
  },
};

export default theme;
