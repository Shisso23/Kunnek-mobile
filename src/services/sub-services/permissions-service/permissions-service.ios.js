import Geolocation from 'react-native-geolocation-service';

const requestLocationPermission = async () => {
  try {
    const result = await Geolocation.requestAuthorization('whenInUse');

    return result === 'granted';
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default {
  requestLocationPermission,
};
