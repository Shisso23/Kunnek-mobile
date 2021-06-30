import { StyleSheet } from 'react-native';

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */

export default ({ Colors, FontFamily, FontSize }) =>
  StyleSheet.create({
    backgroundPrimary: {
      backgroundColor: Colors.primary,
    },
    backgroundReset: {
      backgroundColor: Colors.transparent,
    },
    bottomDrawer: {
      backgroundColor: Colors.lightGrey,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: -10,
      padding: 10,
    },
    centerText: {
      textAlign: 'center',
    },
    centerWhiteText: {
      color: Colors.white,
      textAlign: 'center',
    },
    errorStyle: {
      color: Colors.error,
      fontFamily: FontFamily.primary,
      fontSize: 15,
    },
    headerLogo: {
      width: 200,
    },
    link: {
      color: Colors.secondary,
      fontWeight: 'bold',
    },
    noBold: {
      fontWeight: 'normal',
    },
    rightAlignText: {
      textAlign: 'right',
    },
    smallDivider: {
      borderColor: Colors.darkGrey,
      borderRightWidth: 1,
      height: 70,
    },
    smallGreyText: {
      color: Colors.lynch,
      fontSize: FontSize.small,
    },
    smallText: {
      fontSize: FontSize.small,
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
    viewCard: {
      backgroundColor: Colors.white,
      borderRadius: 12,
      elevation: 9,
      padding: 10,
      shadowColor: Colors.grey,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,

      shadowRadius: 5.46,
    },
  });
