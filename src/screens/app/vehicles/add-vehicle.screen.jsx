import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { FormScreenContainer } from '../../../components';
import Index from '../../../components/atoms/title';
import { VehicleForm } from '../../../components/forms';
import { successful } from '../../../helpers/errors.helper';
import { createVehicleModel } from '../../../models/app/vehicle/create-vehicle.model';
import { createVehicleAction } from '../../../reducers/user-reducer/user-vehicles.actions';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { useTheme } from '../../../theme';

const AddVehicleScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const _handleSubmit = (currentForm) => {
    return dispatch(createVehicleAction(currentForm))
      .then((vehicleResponse) => {
        if (successful(vehicleResponse)) {
          return true;
        }
      })
      .catch((error) => {
        console.warn(error.message);
      });
  };

  const _formSuccess = () => {
    navigation.goBack();
  };

  const { Gutters } = useTheme();
  const { delivererId } = useSelector(userSelector);

  return (
    <FormScreenContainer>
      <Index title="Add vehicle" />
      <Divider />
      <View style={Gutters.smallHMargin}>
        <VehicleForm
          submitForm={_handleSubmit}
          onSuccess={_formSuccess}
          initialValues={createVehicleModel({ collector_id: delivererId })}
          containerStyle={Gutters.smallHMargin}
        />
      </View>
    </FormScreenContainer>
  );
};

AddVehicleScreen.propTypes = {};

AddVehicleScreen.defaultProps = {};

export default AddVehicleScreen;
