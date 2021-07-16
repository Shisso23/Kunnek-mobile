import storageService from '../storage-service/storage.service';

const storeFcmToken = (fcmToken) => {
  return storageService.storeFcmToken(fcmToken);
};

const removeFcmToken = () => {
  return storageService.removeFcmToken();
};

const getFcmToken = () => {
  return storageService.getFcmToken();
};

export default {
  storeFcmToken,
  removeFcmToken,
  getFcmToken,
};
