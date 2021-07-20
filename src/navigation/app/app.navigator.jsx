import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/app/home/home.screen';
import ProfileScreen from '../../screens/app/profile/profile.screen';
import ContactUsScreen from '../../screens/app/contact/ContactUs.screen';
import useTheme from '../../theme/hooks/useTheme';
import { CustomDrawer } from '../../components/molecules';

import SendParcelScreen from '../../screens/app/send-parcel/send-parcel.screen';
import TransactionHistoryScreen from '../../screens/app/history/history.screen';
import AddVehicleScreen from '../../screens/app/vehicles/add-vehicle.screen';
import NotificationHistoryScreen from '../../screens/app/notifications/notifications.screen';
import PaymentScreen from '../../screens/app/payment/payment.screen';
import ParcelRequestsScreen from '../../screens/app/parcel-requests/parcel-requests.screen';
import { Colors } from '../../theme/Variables';
import ParcelDetailsScreen from '../../screens/app/parcel-details/parcel-details.screen';
import TransactionDetailScreen from '../../screens/app/transactions/transaction-details.screen';
import OTPScreen from '../../screens/app/OTP/otp.screen';
import EditParcelScreen from '../../screens/app/edit-parcel/edit-parcel.screen';
import OtherUserProfileScreen from '../../screens/app/other-user-profile/other-user-profile.screen';
import ReviewScreen from '../../screens/app/review/review.screen';
import ChatScreen from '../../screens/app/chat/chat.screen';
import DeliverParcelScreen from '../../screens/app/deliver-parcel/deliver-parcel.screen';
import AddBankAccountScreen from '../../screens/app/bank-accounts/add-bank-account.screen';
import EditVehicleScreen from '../../screens/app/vehicles/edit-vehicle.screen';
import EditBankAccountScreen from '../../screens/app/bank-accounts/edit-bank-account.screen';
import MyReviewsScreen from '../../screens/app/my-reviews/my-reviews.screen';
import EditProfileScreen from '../../screens/app/profile/edit-profile.screen';
import AddCreditCardScreen from '../../screens/app/credit-cards/add-credit-card.screen';
import ViewParcelScreen from '../../screens/app/view-parcel/view-parcel.screen';
import ViewCreditCardScreen from '../../screens/app/credit-cards/edit-credit-card.screen';

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
      <AppStack.Screen name="DeliveryRequest" component={DeliverParcelScreen} />
      <AppStack.Screen name="EditParcel" component={EditParcelScreen} />
      <AppStack.Screen name="ViewParcel" component={ViewParcelScreen} />
      <AppStack.Screen name="ParcelRequests" component={ParcelRequestsScreen} />
      <AppStack.Screen name="ParcelDetails" component={ParcelDetailsScreen} />
      <AppStack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
      <AppStack.Screen name="NotificationHistory" component={NotificationHistoryScreen} />
      <AppStack.Screen name="AddVehicle" component={AddVehicleScreen} />
      <AppStack.Screen name="EditVehicle" component={EditVehicleScreen} />
      <AppStack.Screen name="AddBankAccount" component={AddBankAccountScreen} />
      <AppStack.Screen name="EditBankAccount" component={EditBankAccountScreen} />
      <AppStack.Screen name="AddCreditCard" component={AddCreditCardScreen} />
      <AppStack.Screen name="ViewCreditCard" component={ViewCreditCardScreen} />
      <AppStack.Screen name="Payment" component={PaymentScreen} />
      <AppStack.Screen name="OTP" component={OTPScreen} />
      <AppStack.Screen name="ContactUs" component={ContactUsScreen} />
      <AppStack.Screen name="TransactionDetails" component={TransactionDetailScreen} />
      <AppStack.Screen name="UserDetails" component={OtherUserProfileScreen} />
      <AppStack.Screen name="Review" component={ReviewScreen} />
      <AppStack.Screen name="Chat" component={ChatScreen} />
      <AppStack.Screen name="MyReviews" component={MyReviewsScreen} />
      <AppStack.Screen name="EditProfile" component={EditProfileScreen} />
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
