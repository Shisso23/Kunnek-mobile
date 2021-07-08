import * as Yup from 'yup';

const numberRegex = /^[0-9]+$/;

export const mobileNumberSchema = Yup.string().required('Mobile number is required');
export const passwordSchema = Yup.string().required('Password is required');

export const emailSchema = Yup.string().email('Invalid Email').trim().required('Email is required');

export const registerPasswordSchema = (edit) =>
  !edit
    ? Yup.string()
        .min(6, 'Minimum of 6 characters needed for password')
        .required('Password is required')
    : Yup.string().notRequired();

export const confirmPasswordSchema = (edit) =>
  !edit
    ? Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required')
    : Yup.string().notRequired();

export const termsAndConditionsSchema = (edit) =>
  !edit ? Yup.bool().oneOf([true]) : Yup.string().notRequired();

export const numericSchema = Yup.string().matches(numberRegex, 'Can only contain digits');

export const twoFactorAuthSchema = (edit) => (edit ? Yup.bool() : Yup.bool().notRequired());

export const profilePictureSchema = (edit) =>
  edit
    ? Yup.object().shape({
        name: Yup.string(),
        uri: Yup.string(),
        type: Yup.string(),
      })
    : Yup.object().notRequired();
