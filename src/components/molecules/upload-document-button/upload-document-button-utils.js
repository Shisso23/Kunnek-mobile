import * as ImagePicker from 'react-native-image-picker';
import * as DocumentPicker from 'react-native-document-picker';

const successfullySelectedImage = (res) => !res.didCancel;
const errorOccured = (res) => res.errorCode;

const constructFormData = (res) => ({
  uri: res.uri,
  type: res.type,
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
