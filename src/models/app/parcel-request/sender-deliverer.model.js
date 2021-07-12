import _ from 'lodash';

const setProfilePicture = (_apiUserModel) => {
  let pictureUri = _.get(_apiUserModel, 'profile_picture');
  if (_.isNil(pictureUri)) {
    pictureUri = `https://loremflickr.com/320/240/landscape?random=${_.random(1000)}`;
  }
  return pictureUri;
};

const senderDelivererModel = (_apiSenderDelivererModel = {}) => ({
  id: _.get(_apiSenderDelivererModel, 'id', ''),
  userId: _.get(_apiSenderDelivererModel, 'user_id', ''),
  fullName: _.get(_apiSenderDelivererModel, 'full_name', ''),
  profilePictureUri: setProfilePicture(_apiSenderDelivererModel),
  mobileNumber: _.get(_apiSenderDelivererModel, 'mobile-number', ''),
});

const vehicleModel = (_apiVehicleModel = {}) => ({
  make: _.get(_apiVehicleModel, 'make', ''),
  model: _.get(_apiVehicleModel, 'model', ''),
  registrationNumber: _.get(_apiVehicleModel, 'registration_number', ''),
});

export const senderModel = (_apiSenderModel = {}) => ({
  ...senderDelivererModel(_apiSenderModel),
  type: 'sender',
});

export const delivererModel = (_apiDelivererModel = {}) => ({
  ...senderDelivererModel(_apiDelivererModel),
  type: 'collector',
  idNumber: _.get(_apiDelivererModel, 'id_number', ''),
  vehicle: vehicleModel(_.get(_apiDelivererModel, 'vehicle'), {}),
});
