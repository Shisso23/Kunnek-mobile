import React, { useEffect } from 'react';
import { ViewPropTypes, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Input, Text, Button } from 'react-native-elements';
import useTheme from '../../../theme/hooks/useTheme';
import { flashService } from '../../../services';
import { getFormError } from '../form-utils';
import DropDownSelect from '../../molecules/dropdown-select/DropDownSelect';
import { getParcelRequestsAction } from '../../../reducers/parcel-request-reducer/parcel-request.actions';

const issueTypes = ['Bug', 'Complaint', 'General'];
const { Common, Colors, Custom, Gutters } = useTheme();

const ContactUsForm = ({ submitForm, onSuccess, containerStyle, initialValues }) => {
  const { parcelRequests = [] } = useSelector((state) => state.parcelRequestReducer);
  const validationSchema = Yup.object().shape({
    description: Yup.string(),
    issueType: Yup.string().required(),
    connectedParcel: Yup.string().required(),
    connectedParcelId: Yup.number().required(),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParcelRequestsAction({ for_current_user: true }));
  }, []);

  const _handleSubmission = (formData, actions) => {
    submitForm(formData)
      .then((response) => {
        actions.setSubmitting(false);
        flashService.success('Query submitted successfully.');
        onSuccess(response);
      })
      .catch((error) => {
        actions.setSubmitting(false);
        if (_.get(error, 'statusCode') === 422) {
          const apiErrors = error.errors;
          flashService.error('Form Submission Error');
          actions.resetForm({ values: formData, status: { apiErrors } });
        }
      });
  };

  return (
    <View style={containerStyle}>
      <Formik
        initialValues={initialValues}
        initialStatus={{ apiErrors: {} }}
        onSubmit={_handleSubmission}
        validationSchema={validationSchema}
      >
        {({
          setFieldValue,
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
          status,
        }) => {
          const error = (name) => getFormError(name, { touched, status, errors });
          return (
            <>
              <Text style={[Custom.headerTitleStyle, styles.headerTileExtraStyle]}>Contact Us</Text>
              <Text style={[Common.smallText, styles.helpTextStyle]}>How can we help you?</Text>
              <Text style={[Common.smallText, styles.smallText]}>Select an issue with</Text>
              <DropDownSelect
                value={values.issueType}
                keyExtractor={(item, index) => `${item}${index}`}
                onChange={handleChange('issueType')}
                items={issueTypes}
                valueExtractor={(issue) => issue}
                error={error('issueType')}
                placeholder="Select issue"
              />
              <Text style={[Common.smallText, styles.smallText]}>
                Select connected parcel request
              </Text>
              <DropDownSelect
                value={values.connectedParcel}
                keyExtractor={(item, index) => `${item.description}${index}`}
                onChange={(parcel) => {
                  setFieldValue('connectedParcel', parcel.description);
                  setFieldValue('connectedParcelId', parcel.id);
                }}
                items={parcelRequests}
                valueExtractor={(item) => item.description}
                error={error('connectedParcel')}
                placeholder="Select parcel"
                contentStyle={styles.parcelsContent}
              />
              <Text style={[Common.smallText, styles.smallText, Gutters.smallBMargin]}>
                Description
              </Text>

              <Input
                value={values.description}
                multiline={true}
                onChangeText={handleChange('description')}
                placeholder="Description"
                inputContainerStyle={styles.inputStyle}
                inputStyle={styles.inputStyle}
              />
              <Button
                title="Submit"
                onPress={handleSubmit}
                titleStyle={[styles.texts, styles.buttonTitle]}
                containerStyle={styles.submitButton}
                loading={isSubmitting}
              />
            </>
          );
        }}
      </Formik>
    </View>
  );
};

ContactUsForm.propTypes = {
  containerStyle: ViewPropTypes.style,
  initialValues: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};

ContactUsForm.defaultProps = {
  containerStyle: {},
  initialValues: {},
};

export default ContactUsForm;

const styles = StyleSheet.create({
  buttonTitle: { color: Colors.white, fontSize: 15 },
  headerTileExtraStyle: { color: Colors.black, fontSize: 25, marginBottom: 10 },
  helpTextStyle: { fontSize: 12, marginBottom: 10 },
  inputStyle: {
    height: 120,
    marginLeft: -3,
    width: '102%',
  },
  parcelsContent: { maxHeight: '80%' },
  smallText: { color: Colors.black, fontSize: 15 },
  submitButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    bottom: '12%',
    position: 'absolute',
    width: '60%',
  },
  texts: {
    color: Colors.darkGrey,
    fontSize: 13,
  },
});
