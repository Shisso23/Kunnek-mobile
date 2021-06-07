import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Drawer } from 'react-native-paper';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Rating, Text } from 'react-native-elements';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { signOutAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import { useTheme } from '../../../theme';

const { Gutters, Layout, Images, Colors, Custom } = useTheme();

const DrawerContent = (props) => {
  const { navigation } = props;
  const { user } = useSelector((reducers) => reducers.userReducer);
  const dispatch = useDispatch();

  const _signOut = () => {
    dispatch(signOutAction());
  };

  return (
    <View style={[Layout.fill]}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={{ backgroundColor: Colors.darkBackground }}>
          <View style={[Layout.alignItemsStart, Gutters.regularPadding]}>
            <Avatar rounded source={{ uri: user.profilePictureUri }} size={65} />
            <Rating
              type="custom"
              ratingImage={Images.star}
              ratingColor="transparent"
              ratingBackgroundColor="transparent"
              readonly
              startingValue={Number(_.get(user, 'rating', 0))}
              imageSize={20}
              style={styles.ratingStyle}
            />
            <Text h2 style={[Custom.whiteText]}>
              {_.get(user, 'fullName', '')}
            </Text>
          </View>
          <Image source={Images.drawerGradient} style={styles.drawerGradient} />
          <DrawerItem
            icon={() => <Icon color={Colors.primary} size={20} name="home" />}
            label="Home"
            labelStyle={styles.labelStyle}
            onPress={() => navigation.navigate('Home')}
          />
          <DrawerItem
            icon={() => <Icon color={Colors.primary} size={20} name="user" />}
            label="Profile"
            labelStyle={styles.labelStyle}
            onPress={() => navigation.navigate('Profile')}
          />
        </Drawer.Section>
        <Drawer.Section>
          <DrawerItem
            icon={() => <Image source={Images.sendParcelIconBlue} style={styles.icon} />}
            label="Send Parcel"
            onPress={() => navigation.navigate('SendParcel')}
          />
          <DrawerItem
            icon={() => <Image source={Images.deliverParcelIconBlue} style={styles.icon} />}
            label="Deliver Parcel"
            onPress={() => navigation.navigate('HomeScreen')}
          />
          <DrawerItem
            icon={() => <Image source={Images.parcelsIconBlue} style={styles.icon} />}
            label="My Parcels"
            onPress={() => navigation.navigate('ViewParcel')}
          />
          <DrawerItem
            icon={() => <Icon color={Colors.primary} size={20} name="sign-out-alt" />}
            label="Sign Out"
            onPress={_signOut}
          />
        </Drawer.Section>
        <DrawerItem
          icon={() => <Image source={Images.contactUsIcon} style={styles.icon} />}
          label="Contact Us"
          onPress={() => navigation.navigate('Home')}
        />
      </DrawerContentScrollView>
    </View>
  );
};

DrawerContent.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  drawerGradient: {
    height: 8,
    width: '100%',
  },
  icon: {
    height: 20,
    resizeMode: 'contain',
    width: 20,
  },
  labelStyle: {
    color: Colors.white,
  },
  ratingStyle: {
    marginVertical: 6,
  },
});

export default DrawerContent;
