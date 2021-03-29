import { CardStyleInterpolators } from '@react-navigation/stack';

export default ({ Colors, FontFamily }) => ({
  globalNavigatorScreenOptions: {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: Colors.secondary,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
      shadowColor: 'transparent',
      elevation: 0,
    },
    headerTitleStyle: {
      fontFamily: FontFamily.secondary,
      color: Colors.white,
    },
    headerTintColor: Colors.white,
    cardStyle: {
      backgroundColor: Colors.white,
    },
  },

  globalPlainNavigatorOptions: {
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: Colors.white,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
      shadowColor: 'transparent',
      elevation: 0,
    },
    headerTitleStyle: {
      fontFamily: FontFamily.secondary,
      color: Colors.white,
    },
    headerTintColor: Colors.black,
    cardStyle: {
      backgroundColor: Colors.white,
    },
  },

  whiteText: {
    color: Colors.white,
  },

  // Unique
  initialTitle: {
    fontSize: 52,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginVertical: 30,
  },
  initialLogo: {
    height: 90,
    width: 116,
  },
});
