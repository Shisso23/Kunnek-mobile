import React from 'react';
import { View, Text } from 'react-native';
import { FormScreenContainer } from '../../../components';
import { VehicleForm } from '../../../components/forms';
import { createVehicleModel } from '../../../models/app/vehicle/create-vehicle.model';
import { useTheme } from '../../../theme';

const AddVehicleScreen = () => {
  const _handleSubmit = () => {};
  const _formSuccess = () => {};
  const { Fonts, Gutters } = useTheme();

  return (
    <FormScreenContainer>
      <Text style={[Fonts.titleRegular]}> Add Vehicle</Text>
      <VehicleForm
        submitForm={_handleSubmit}
        onSuccess={_formSuccess}
        initialValues={createVehicleModel()}
        containerStyle={[Gutters.smallHMargin]}
      />
    </FormScreenContainer>
  );
};

export default AddVehicleScreen;
