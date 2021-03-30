import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { Divider } from 'react-native-elements';
import { FormScreenContainer } from '../../../components';
import ParcelInfoForm from '../../../components/forms/parcel-info/parcel-info.form';
import { parcelInfoModel } from '../../../models/app/parcel/parcel-info.model';
import { useTheme } from '../../../theme';

const SendParcelScreen = () => {
  const navigation = useNavigation();
  const { Fonts, Gutters } = useTheme();
  const _handleSubmit = (form) => Promise.resolve(form);

  const _handleSuccess = () => {
    navigation.navigate('ParcelDeliveryDetails');
  };

  return (
    <FormScreenContainer>
      <Divider />
      <Text style={[Fonts.titleRegular]}> Send Parcel</Text>
      <Divider />
      <ParcelInfoForm
        initialValues={parcelInfoModel()}
        submitForm={_handleSubmit}
        onSuccess={_handleSuccess}
        containerStyle={[Gutters.smallHMargin]}
      />
    </FormScreenContainer>
  );
};

SendParcelScreen.propTypes = {};

SendParcelScreen.defaultProps = {};

export default SendParcelScreen;
