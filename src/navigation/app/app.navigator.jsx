import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/app/home/home.screen';
import ProfileScreen from '../../screens/app/profile/profile.screen';
import ContactUsScreen from '../../screens/app/contact/ContactUs.screen';
import useTheme from '../../theme/hooks/useTheme';
import { CustomDrawer } from '../../components/molecules';

import SendParcelScreen from '../../screens/app/send-parcel/send-parcel.screen';
import ParcelDeliveryDetailsScreen from '../../screens/app/parcel-delivery-details/parcel-delivery-details.screen';
import ViewParcelsScreen from '../../screens/app/view-parcels/view-parcels.screen';
import TransactionHistoryScreen from '../../screens/app/history/history.screen';
import AddVehicleScreen from '../../screens/app/vehicles/add-vehicle.screen';
import ViewVehicleScreen from '../../screens/app/vehicles/view-vehicle.screen';
import NotificationHistoryScreen from '../../screens/app/notifications/notifications.screen';
import PaymentScreen from '../../screens/app/payment/payment.screen';
import ParcelRequestsScreen from '../../screens/app/parcel-requests/parcel-requests.screen';
import AddCardScreen from '../../screens/app/credit-card/add-card.screen';
import { Colors } from '../../theme/Variables';
import ParcelDetailsScreen from '../../screens/app/parcel-details/parcel-details.screen';
import TransactionDetailScreen from '../../screens/app/transactions/transaction-details.screen';

const Drawer = createDrawerNavigator();
const AppStack = createStackNavigator();

const AppNavigator = () => {
  const { Custom } = useTheme();
  return (
    <AppStack.Navigator screenOptions={Custom.globalPlainNavigatorOptions}>
      <AppStack.Screen
        name="App Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen name="SendParcel" component={SendParcelScreen} />
      <AppStack.Screen name="ViewParcel" component={ViewParcelsScreen} />
      <AppStack.Screen name="ParcelRequests" component={ParcelRequestsScreen} />
      <AppStack.Screen name="ParcelDetails" component={ParcelDetailsScreen} />
      <AppStack.Screen name="ParcelDeliveryDetails" component={ParcelDeliveryDetailsScreen} />
      <AppStack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
      <AppStack.Screen name="NotificationHistory" component={NotificationHistoryScreen} />
      <AppStack.Screen name="AddVehicle" component={AddVehicleScreen} />
      <AppStack.Screen name="ViewVehicle" component={ViewVehicleScreen} />
      <AppStack.Screen name="Payment" component={PaymentScreen} />
      <AppStack.Screen name="ContactUs" component={ContactUsScreen} />
      <AppStack.Screen name="AddCardScreen" component={AddCardScreen} />
      <AppStack.Screen name="TransactionDetails" component={TransactionDetailScreen} />
    </AppStack.Navigator>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} initialRouteName="Home">
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: true,
        title: '',
        headerStyle: {
          backgroundColor: Colors.transparent,
        },
      }}
    />
    <Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: true, title: 'Profile' }}
    />
  </Drawer.Navigator>
);

export default AppNavigator;
