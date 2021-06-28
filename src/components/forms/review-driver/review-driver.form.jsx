import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import _ from 'lodash';
import { Button } from 'react-native-elements';
import { SafeAreaView, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { ReviewItem } from '../../molecules';
import { getFormError } from '../form-utils';
import { useTheme } from '../../../theme';
import { PaperContainer } from '../../containers';
import ProfilePicture from '../../atoms/profile-picture';

const ReviewDriverForm = ({ submitForm, user, parcelRequest }) => {
  const initialValues = {
    comment: '',
    onTimeDelivery: 0,
    onTimeCollection: 0,
    conditionOfItem: 0,
  };

  const validationSchema = Yup.object().shape({
    comment: Yup.string(),
    onTimeDelivery: Yup.number().required(
      'Please rate the driver on this metric on a scale of 1 to 5',
    ),
    onTimeCollection: Yup.number().required(
      'Please rate the driver on this metric on a scale of 1 to 5',
    ),
    conditionOfItem: Yup.number().required(
      'Please rate the driver on this metric on a scale of 1 to 5',
    ),
  });

  const _handleSubmission = (formData, actions) => {
    submitForm(formData).then(() => {
      actions.setSubmitting(false);
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        isSubmitting,
        handleBlur,
        touched,
        status,
        setFieldValue,
      }) => {
        const error = (name) => getFormError(name, { touched, status, errors });
        const { Layout, Gutters, Fonts, Common } = useTheme();

        return (
          <>
            <PaperContainer>
              <View style={[Layout.center]}>
                <ProfilePicture user={user} />
                <Text style={[Gutters.regularHMargin]}>{_.get(user, 'fullName')}</Text>
                <Text style={[Fonts.secondaryRegular]}>{_.get(parcelRequest, 'description')}</Text>
              </View>
              <ReviewItem
                value={values.conditionOfItem}
                onChange={(value) => setFieldValue('conditionOfItem', value)}
                onBlur={handleBlur('conditionOfItem')}
                errorMessage={error('conditionOfItem')}
                title={'Condition of parcel'}
              />
              <ReviewItem
                value={values.onTimeDelivery}
                onChange={(value) => setFieldValue('onTimeDelivery', value)}
                onBlur={handleBlur('onTimeDelivery')}
                errorMessage={error('onTimeDelivery')}
                title={'On time delivery'}
              />
              <ReviewItem
                value={values.onTimeCollection}
                onChange={(value) => setFieldValue('onTimeCollection', value)}
                onBlur={handleBlur('onTimeCollection')}
                errorMessage={error('onTimeCollection')}
                title={'On time collection'}
              />
            </PaperContainer>
            <Text style={[Gutters.regularHMargin, Fonts.secondaryRegular]}>Comment:</Text>
            <TextInput
              value={`${values.comment}`}
              onChangeText={handleChange('comment')}
              onBlur={handleBlur('comment')}
              errorMessage={error('comment')}
              multiline={true}
              numberOfLines={5}
              style={[Common.viewCard, Gutters.regularHMargin]}
            />
            <View style={[Layout.fill]} />
            <SafeAreaView style={[Gutters.largeMargin]}>
              <Button onPress={handleSubmit} loading={isSubmitting} title="Submit" />
            </SafeAreaView>
          </>
        );
      }}
    </Formik>
  );
};

ReviewDriverForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  user: PropTypes.object.isRequired,
  parcelRequest: PropTypes.object.isRequired,
};

ReviewDriverForm.defaultProps = {
  onSuccess: () => null,
};

export default ReviewDriverForm;
