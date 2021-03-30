import _ from 'lodash';
import { Alert } from 'react-native';

export const extractKey = (item, index = 0) => _.get(item, 'id', index).toString();

export const deletePrompt = (onDelete) => {
  Alert.alert(
    'Are you sure?',
    'Are you sure you want to delete this item?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Delete', onPress: onDelete },
    ],
    { cancelable: true },
  );
};

const fieldsToExcludeFromRecursion = ['photo'];

export const objectToFormData = (obj, form, type) => {
  const formData = form || new FormData();
  let formKey;

  if (obj) {
    Object.keys(obj).forEach((name) => {
      formKey = `${type}[${name}]`;

      if (typeof obj[name] === 'object' && !fieldsToExcludeFromRecursion.includes(name)) {
        objectToFormData(obj[name], formData, formKey);
      } else {
        // if it's a string or a File object
        formData.append(`${type}[${name}]`, obj[name]);
      }
    });
  }

  return formData;
};
