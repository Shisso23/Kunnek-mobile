import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useTheme } from '../../../theme';

const { Colors, Layout, Images, Gutters } = useTheme();

const BottomNavigationBar = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={[styles.tabContainer, Layout.rowCenterSpaceAround]}>
        <TouchableOpacity
          style={[Layout.fill, Layout.colCenter]}
          onPress={() => navigation.navigate('SendParcel')}
        >
          <Image source={Images.sendParcelIcon} style={styles.icon} />
          <Text style={styles.title}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Layout.fill, Layout.colCenter]}
          onPress={() => navigation.navigate('Home')}
        >
          <View style={styles.higlightButton}>
            <Image source={Images.deliverParcelIcon} style={styles.icon} />
            <Text style={[styles.title, Gutters.tinyBPadding]}>Deliver</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Layout.fill, Layout.colCenter]}
          onPress={() => navigation.navigate('ParcelRequests')}
        >
          <Image source={Images.parcelsIcon} style={styles.icon} />
          <Text style={styles.title}>Parcels</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
BottomNavigationBar.propTypes = {};

BottomNavigationBar.defaultProps = {
  navigation: {},
  state: {},
  routes: {},
};

const styles = StyleSheet.create({
  icon: {
    height: 25,
    resizeMode: 'contain',
  },
  tabContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    height: 60,
    paddingVertical: 5,
    width: '90%',
  },
  title: { color: Colors.white, fontSize: 12, textAlign: 'center' },
  higlightButton: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 2,
  },
});

export default BottomNavigationBar;
