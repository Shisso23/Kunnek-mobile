/* eslint-disable camelcase */
import _ from 'lodash';

const setProfilePicture = (_apiUserModel) => {
  let pictureUri = _.get(_apiUserModel, 'profile_picture', '');
  if (_.isNil(pictureUri)) {
    pictureUri = `https://loremflickr.com/320/240/landscape?random=${_.random(1000)}`;
  }
  return pictureUri;
};

export const userModel = (_apiUserModel = {}) => ({
  email: _.get(_apiUserModel, 'email', ''),
  id: _.get(_apiUserModel, 'id', ''),
  firstName: _.get(_apiUserModel, 'first_name', _.get(_apiUserModel, 'name', '')),
  lastName: _.get(_apiUserModel, 'last_name', ''),
  mobileNumber: _.get(_apiUserModel, 'mobile_number', ''),
  idNumber: _.get(_apiUserModel, 'id_number', ''),
  profilePictureUri: setProfilePicture(_apiUserModel),
  rating: _.get(_apiUserModel, 'rating', ''),
  shouldTrack: _.get(_apiUserModel, 'should_be_tracked', ''),
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
});

export const apiUserModel = (_appUserModel = {}) => ({
  user: {
    email: _.get(_appUserModel, 'email', ''),
    name: _.get(_appUserModel, 'name', ''),
  },
});

export const apiUpdateUserModel = (_appUserModel = {}) => {
  const data = {
    user: {
      first_name: _.get(_appUserModel, 'firstName', ''),
      last_name: _.get(_appUserModel, 'lastName', ''),
      mobile_number: _.get(_appUserModel, 'mobileNumber', ''),
      id_number: _.get(_appUserModel, 'idNumber', ''),
      email: _.get(_appUserModel, 'email', ''),
    },
  };

  const photoUri = _.get(_appUserModel, 'profilePictureUri', '');
  if (!_.isEmpty(photoUri)) {
    data.user.profile_picture = {
      uri: photoUri,
      name: 'profile_picture',
      type: 'image/jpeg',
    };
  }

  return data;
};
