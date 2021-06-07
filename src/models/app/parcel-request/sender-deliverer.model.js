import _ from 'lodash';

const setProfilePicture = (_apiUserModel) => {
  let pictureUri = _.get(_apiUserModel, 'profile_picture');
  if (_.isNil(pictureUri)) {
    pictureUri = `https://loremflickr.com/320/240/landscape?random=${_.random(1000)}`;
  }
  return pictureUri;
};

export const senderDelivererModel = (_apiSenderDelivererModel = {}) => ({
  id: _.get(_apiSenderDelivererModel, 'id', ''),
  userId: _.get(_apiSenderDelivererModel, 'user_id', ''),
  fullName: _.get(_apiSenderDelivererModel, 'full_name', ''),
  profilePictureUri: setProfilePicture(_apiSenderDelivererModel),
});
