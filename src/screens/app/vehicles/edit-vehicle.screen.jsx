import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { FormScreenContainer } from '../../../components';
import Index from '../../../components/atoms/title';
import { VehicleForm } from '../../../components/forms';
import { successful } from '../../../helpers/errors.helper';
import {
  deleteVehicleAction,
  editVehicleAction,
} from '../../../reducers/user-reducer/user-vehicles.actions';
import { useTheme } from '../../../theme';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme/Variables';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';

const EditVehicleScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { vehicle } = route.params;
  const { vehiclesLoading = false } = useSelector(userSelector);

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

  const _delete = () => {
    dispatch(deleteVehicleAction(_.get(vehicle, 'id', ''))).then(() => navigation.goBack());
  };

  const _formSuccess = () => {
    navigation.goBack();
  };

  const { Gutters, Layout } = useTheme();

  return (
    <FormScreenContainer>
      <Index title="My Vehicle" />
      <Divider />
      <View style={[Gutters.smallHMargin, Layout.fill]}>
        <VehicleForm
          submitForm={_handleSubmit}
          onSuccess={_formSuccess}
          initialValues={vehicle}
          containerStyle={Gutters.smallHMargin}
          submitText="Update Vehicle"
        />
      </View>
      <SafeAreaView>
        <Button
          onPress={_delete}
          title={'Delete'}
          containerStyle={styles.buttonStyle}
          buttonStyle={styles.deleteButtonStyle}
          loading={vehiclesLoading}
        />
      </SafeAreaView>
    </FormScreenContainer>
  );
};

EditVehicleScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default EditVehicleScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: 'center',
    width: '90%',
  },
  deleteButtonStyle: {
    backgroundColor: Colors.error,
  },
});
