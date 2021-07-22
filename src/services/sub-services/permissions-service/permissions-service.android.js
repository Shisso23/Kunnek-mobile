import { PermissionsAndroid } from 'react-native';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Please allow access to your location',
        message:
          "We use your device's location to provide you with accurate delivery jobs in your area. Your device's location will only be used in the background for tracking if you give the app permission. Background location access will only be required for tracking the driver and will only be requested when it is needed.",
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default {
  requestLocationPermission,
};
