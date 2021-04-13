import React from 'react';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/Variables';

const InitialScreen = () => {
  const navigation = useNavigation();
  const { Gutters, Images, Custom, Layout } = useTheme();
  return (
    <>
      <View style={styles.backImage}>
        <Image source={Images.initialBackground} style={styles.backImage} />
        <View style={[styles.backImage, styles.overlay]} />
      </View>

      <SafeAreaView style={[Gutters.smallHMargin, Layout.scrollSpaceAround]}>
        <View style={Layout.colCenter}>
          <Image source={Images.logoWhite} style={Custom.initialLogo} />
          <Text style={Custom.initialTitle}>Welcome to Kunnek</Text>
          <Text style={Custom.whiteText}>Kunnek, the smart way of sending anything</Text>
        </View>
        <View>
          <Button onPress={() => navigation.navigate('SignIn')} title="Log In" />
          <Button
            type="outline"
            onPress={() => navigation.navigate('Register')}
            title="Create an Account"
            buttonStyle={styles.registerButton}
          />
          <Button
            type="clear"
            onPress={() => navigation.navigate('ForgotPassword')}
            title="Forgot Password?"
            titleStyle={styles.forgotButtonText}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  backImage: {
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
  forgotButtonText: {
    fontSize: 12,
  },
  overlay: {
    backgroundColor: Colors.darkGrey,
    opacity: 0.7,
  },
  registerButton: {
    borderColor: Colors.white,
    borderWidth: 1.5,
  },
});

export default InitialScreen;
