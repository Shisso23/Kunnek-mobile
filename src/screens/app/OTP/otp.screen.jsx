import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modal } from 'react-native-paper';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';

import Index from '../../../components/atoms/title';
import { useTheme } from '../../../theme';
import { Button, Image, Text } from 'react-native-elements';
import { OTPInputField } from '../../../components/molecules';
import { PaperContainer } from '../../../components';
import {
  getActionId,
  sendOTP,
  updateParcelStatus,
  verifyParcelDelivery,
} from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { parcelRequestSelector } from '../../../reducers/parcel-request-reducer/parcel-request.reducer';
import { useEffect } from 'react';
import { progressPackageStatus } from '../../../helpers/parcel-request-status.helper';

const OTPScreen = ({ route }) => {
  const { Layout, Gutters, Images } = useTheme();
  const { parcelRequest } = route.params;
  const [otpValue, setOTPValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [popUpView, setPopUpView] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { actionId } = useSelector(parcelRequestSelector);

  useEffect(() => {
    dispatch(getActionId(parcelRequest));
  }, []);

  const _getMobileNumber = () => {
    const mobileNumber = _.get(parcelRequest, 'receiverMobileNumber');
    return mobileNumber;
  };

  const _submitOTP = () => {
    if (otpValue.length < 4) return setErrorMessage('OTP must be 4 digits long');
    dispatch(verifyParcelDelivery(actionId, otpValue)).then((result) => {
      if (result === true) {
        const newStatus = progressPackageStatus(parcelRequest);
        dispatch(updateParcelStatus(parcelRequest, newStatus));
        navigation.navigate('ParcelDetails', parcelRequest);
      }
      setErrorMessage('please fill in the correct OTP');
    });
  };

  const _sendOTP = () => {
    dispatch(sendOTP(actionId)).then((result) => {
      if (_.get(result, 'status') === true) {
        setPopUpView(true);
      }
    });
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
          <Text style={{ color: Colors.primary }} onPress={_sendOTP}>
            Resend OTP
          </Text>
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
          <Button
            style={[styles.buttonSize, Gutters.regularTMargin, styles.box]}
            onPress={_submitOTP}
            title="Continue"
          />
        </PaperContainer>
      </ScrollView>
      <Modal visible={popUpView} transparent={true}>
        <PaperContainer style={[Layout.center, Layout.alignSelfCenter, styles.halfWidth]}>
          <Text>OTP sent successfully</Text>
          <Button
            containerStyle={Layout.fullWidth}
            style={[styles.buttonSize, Gutters.regularTMargin]}
            onPress={() => setPopUpView(!popUpView)}
            title="Close"
          />
        </PaperContainer>
      </Modal>
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
    alignSelf: 'center',
  },
  imageSize: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  halfWidth: {
    width: '50%',
  },
});
