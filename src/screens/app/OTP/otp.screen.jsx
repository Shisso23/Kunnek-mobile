import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Index from '../../../components/atoms/title';
import { useTheme } from '../../../theme';
import { Image, Text } from 'react-native-elements';
import { OTPInputField } from '../../../components/molecules';
import { Button, PaperContainer } from '../../../components';
import { useNavigation } from '@react-navigation/core';

const OTPScreen = ({ route }) => {
  const { Layout, Gutters, Images } = useTheme();
  const mobileNumber = route.params;
  const [otpValue, setOTPValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const _getMobileNumber = () => {
    return mobileNumber;
  };

  const _submitOTP = () => {
    console.log('otp Screen: ', otpValue);
    if (otpValue.length === 4) return navigation.navigate('ParcelDetails');
    setErrorMessage('please fill in the correct OTP');
  };

  return (
    <>
      <Index title="One Time Pin (OTP)" />
      <ScrollView
        style={[Layout.fill]}
        contentContainerStyle={[Layout.scrollCenter, Layout.fullWidth]}
      >
        <View style={[Layout.center]}>
          <Image source={Images.mailIcon} style={[styles.imageSize]} />
        </View>
        <View style={[Layout.center, Gutters.largeVMargin]}>
          <Text>Verification</Text>
          <Text> </Text>
          <Text>{`Enter OTP code sent to the receiver (${_getMobileNumber()})`}</Text>
        </View>
        <PaperContainer>
          <OTPInputField
            length={4}
            value={otpValue}
            onChange={(event) => {
              setOTPValue(event);
            }}
            error={errorMessage}
          />
          <Button style={[styles.buttonSize, Gutters.regularTMargin]} onPress={_submitOTP}>
            Continue
          </Button>
        </PaperContainer>
      </ScrollView>
    </>
  );
};

OTPScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

OTPScreen.defaultProps = {};

export default OTPScreen;

const styles = StyleSheet.create({
  buttonSize: {
    width: '80%',
  },
  imageSize: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
