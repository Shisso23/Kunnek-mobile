import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { FormScreenContainer } from '../../../components';
import Index from '../../../components/atoms/title';
import { VehicleForm } from '../../../components/forms';
import { successful } from '../../../helpers/errors.helper';
import { editVehicleAction } from '../../../reducers/user-reducer/user-vehicles.actions';
import { useTheme } from '../../../theme';

const EditVehicleScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { vehicle } = route.params;

  const _handleSubmit = (currentForm) => {
    return dispatch(editVehicleAction(currentForm))
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

  return (
    <FormScreenContainer>
      <Index title="Edit vehicle" />
      <Divider />
      <View style={[Gutters.smallHMargin]}>
        <VehicleForm
          submitForm={_handleSubmit}
          onSuccess={_formSuccess}
          initialValues={vehicle}
          containerStyle={[Gutters.smallHMargin]}
        />
      </View>
    </FormScreenContainer>
  );
};

EditVehicleScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default EditVehicleScreen;
