import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from '../../../theme';

const BottomNavigationBar = () => {
  const { Layout, Images } = useTheme();

  const navigation = useNavigation();

  return (
    <>
      <View style={[Layout.row, Layout.fill]}>
        <Button
          style={[Layout.fill, styles.navbarButton]}
          onPress={() => navigation.navigate('SendParcel')}
          icon={() => <Image source={Images.sendParcelIcon} />}
        />
        {/* <Button */}
        {/*   style={[Layout.fill]} */}
        {/*   onPress={() => {}} */}
        {/*   icon={() => <Image source={Images.deliverParcelIcon} />} */}
        {/* /> */}
        <Button
          style={[Layout.fill]}
          onPress={() => navigation.navigate('ViewParcel')}
          icon={() => <Image source={Images.parcelsIcon} />}
        />
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

const styles = StyleSheet.create({});

export default BottomNavigationBar;
