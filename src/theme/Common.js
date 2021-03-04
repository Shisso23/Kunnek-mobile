import { StyleSheet } from 'react-native';

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */

export default ({ Colors, FontFamily }) =>
  StyleSheet.create({
    backgroundPrimary: {
      backgroundColor: Colors.primary,
    },
    backgroundReset: {
      backgroundColor: Colors.transparent,
    },
    errorStyle: {
      color: Colors.error,
      fontFamily: FontFamily.primary,
      fontSize: 15,
      height: 26,
    },
    headerLogo: {
      width: 200,
    },
    link: {
      color: Colors.secondary,
      fontWeight: 'bold',
    },
    textInput: {
      backgroundColor: Colors.inputBackground,
      borderColor: Colors.text,
      borderWidth: 1,
      color: Colors.text,
      marginBottom: 10,
      marginTop: 10,
      minHeight: 50,
      textAlign: 'center',
    },
  });
