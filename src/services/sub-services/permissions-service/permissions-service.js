import { Platform } from 'react-native';

import permissionsServiceAndroid from './permissions-service.android';
import permissionsServiceIOS from './permissions-service.ios';

const PLATFORM_ANDROID = 'android';
const PLATFORM_IOS = 'ios';

const requestLocationPermission = () => {
  if (Platform.OS === PLATFORM_ANDROID) {
    return permissionsServiceAndroid.requestLocationPermission();
  }
  if (Platform.OS === PLATFORM_IOS) {
    return permissionsServiceIOS.requestLocationPermission();
  }

  return null;
};

export default {
  requestLocationPermission,
};
