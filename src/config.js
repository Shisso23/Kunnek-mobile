import Config from 'react-native-config';

const {
  API_LOCATION,
  CLIENT_ID,
  CLIENT_SECRET,
  HOST_URL,
  ENVIRONMENT,
  GOOGLE_MAPS_API_KEY,
  PP_AUTH_BEARER,
  PP_3D_ENTITY_ID,
  PEACH_PAYMENT_URL,
} = Config;

export default {
  accessTokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
  hostUrl: HOST_URL,
  apiUrl: `${HOST_URL}${API_LOCATION}`,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  environment: ENVIRONMENT,

  googleMaps: {
    apiKey: GOOGLE_MAPS_API_KEY,
    latitudeDelta: 1.2222,
    longitudeDelta: 1.0721,
    maxZoomLevel: 15,
  },

  peachPayments: {
    ppAuthBearer: PP_AUTH_BEARER,
    pp3dEntityId: PP_3D_ENTITY_ID,
    peachPaymentMode: 'test',
    peachPaymentUrl: PEACH_PAYMENT_URL,
  },
};
