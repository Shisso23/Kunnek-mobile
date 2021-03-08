import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/app/home/home.screen';
import ProfileScreen from '../../screens/app/profile/profile.screen';
import useTheme from '../../theme/hooks/useTheme';
import { CustomDrawer } from '../../components/molecules';

import SendParcelScreen from '../../screens/app/send-parcel/send-parcel.screen';
import ViewParcelsScreen from '../../screens/app/view-parcels/view-parcels.screen';
import HistoryScreen from '../../screens/app/history/history.screen';

const Drawer = createDrawerNavigator();
const AppStack = createStackNavigator();

const AppNavigator = () => {
  const { Custom } = useTheme();
  return (
    <AppStack.Navigator screenOptions={Custom.globalNavigatorScreenOptions}>
      <AppStack.Screen
        name="App Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen name="SendParcel" component={SendParcelScreen} />
      <AppStack.Screen name="ViewParcel" component={ViewParcelsScreen} />
    </AppStack.Navigator>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} initialRouteName="Home">
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: true, title: 'Home' }}
    />
    <Drawer.Screen
      name="History"
      component={HistoryScreen}
      options={{ headerShown: true, title: 'History' }}
    />
    <Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: true, title: 'Profile' }}
    />
  </Drawer.Navigator>
);

export default AppNavigator;
