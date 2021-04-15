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
