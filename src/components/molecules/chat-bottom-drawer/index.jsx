import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { SafeAreaView } from 'react-native';
import { TextInput } from 'react-native';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/Variables';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';

const ChatBottomDrawer = ({ submitMessage }) => {
  const { Layout, Gutters, Common } = useTheme();
  const initialValues = { message: '' };
  const validationSchema = Yup.object().shape({
    message: Yup.string().required(),
  });

  const _handleSubmission = (formData, { resetForm }) => {
    submitMessage(formData);
    resetForm({ values: { message: '' } });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={_handleSubmission}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleSubmit, values }) => {
        return (
          <SafeAreaView style={[styles.tabContainer, Layout.row, Layout.alignItemsCenter]}>
            <TextInput
              value={values.message}
              onChangeText={handleChange('message')}
              multiline={true}
              style={[Common.viewCard, Gutters.regularMargin, Layout.fill]}
              placeholder="message"
            />
            <Icon
              name="paper-plane"
              color={Colors.white}
              size={25}
              style={Gutters.smallMargin}
              onPress={handleSubmit}
            />
          </SafeAreaView>
        );
      }}
    </Formik>
  );
};

ChatBottomDrawer.propTypes = {
  submitMessage: PropTypes.func,
};

ChatBottomDrawer.defaultProps = {
  submitMessage: () => {},
};

export default ChatBottomDrawer;

const styles = StyleSheet.create({
  tabContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    width: '100%',
  },
});
