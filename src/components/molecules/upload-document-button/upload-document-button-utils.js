import * as ImagePicker from 'react-native-image-picker';
import * as DocumentPicker from 'react-native-document-picker';
import _ from 'lodash';

const successfullySelectedImage = (res) => !_.get(res, 'didCancel');
const errorOccured = (res) => _.get(res, 'errorCode');

const constructFormData = (res) => ({
  uri: _.get(res, 'uri'),
  type: _.get(res, 'type'),
});

const imageOptions = {
  mediaType: 'photo',
};

const genericLaunch = (launchFunction) =>
  new Promise((resolve, reject) => {
    launchFunction(imageOptions, (res) => {
      if (successfullySelectedImage(res)) {
        resolve(constructFormData(res));
      } else if (errorOccured(res)) {
        reject();
      }
    });
  });

export const openUserGallery = () => genericLaunch(ImagePicker.launchImageLibrary);

export const openUserCamera = () => genericLaunch(ImagePicker.launchCamera);

export const openDocumentPicker = () =>
  DocumentPicker.pick({
    type: [DocumentPicker.types.pdf],
  }).then(constructFormData);
