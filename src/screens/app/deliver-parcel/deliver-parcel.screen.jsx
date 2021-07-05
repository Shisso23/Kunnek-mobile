import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-elements';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderBackButton } from '@react-navigation/stack';

import { FormScreenContainer, UserSummaryCard, ViewParcelCard } from '../../../components';
import { useTheme } from '../../../theme';
import Index from '../../../components/atoms/title';
import { Colors } from '../../../theme/Variables';
import { deliveryTripDetailsDetailsFormModel } from '../../../models/app/parcel-request/parcel-request-form.model';
import { successful } from '../../../helpers/errors.helper';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import {
  createUserBankAccountsAction,
  getUserBankAccountsAction,
} from '../../../reducers/user-reducer/user-bank-account.actions';
import DeliverParcelDetailsForm from '../../../components/forms/parcel-request/deliver-parcel-details.form';
import {
  createVehicleAction,
  getUserVehiclesAction,
} from '../../../reducers/user-reducer/user-vehicles.actions';
import { createTripAction } from '../../../reducers/trip-reducer/trip.actions';
import { updateParcelStatus } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import { BankAccountForm, VehicleForm } from '../../../components/forms';
import { createVehicleModel } from '../../../models/app/vehicle/create-vehicle.model';
import { userBankAccountModel } from '../../../models/app/user/user-bank-account.model';

const screenWidth = Dimensions.get('window').width;

const DeliverParcelScreen = ({ route }) => {
  const navigation = useNavigation();
  const { parcelRequest } = route.params;
  const { Fonts, Gutters, Layout } = useTheme();
  const { delivererId, bankAccounts, vehicles } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [formIndex, setFormIndex] = useState(0);
  const defaultVehicle = _.get(_.nth(vehicles, 0), 'id', '');

  const hasBankAccounts = Array.isArray(bankAccounts) ? bankAccounts.length > 0 : false;
  const hasVehicles = Array.isArray(vehicles) ? vehicles.length > 0 : false;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <HeaderBackButton {...props} onPress={_goToPrevious} />,
    });
  }, [navigation, formIndex]);

  useEffect(() => {
    dispatch(getUserBankAccountsAction());
    dispatch(getUserVehiclesAction());
  }, []);

  const _deliveryInitialValues = () =>
    deliveryTripDetailsDetailsFormModel({
      delivererId: delivererId,
      vehicleId: defaultVehicle,
      ...parcelRequest,
    });

  const _handleSubmitDeliveryDetailsForm = (currentForm) => {
    return dispatch(createTripAction(currentForm))
      .then((tripResponse) => {
        if (successful(tripResponse)) {
          return dispatch(updateParcelStatus(parcelRequest, tripResponse)).then((jobResponse) => {
            if (successful(jobResponse)) {
              return true;
            }
          });
        }
      })
      .catch((error) => {
        console.warn(error.message);
      });
  };

  const _handleSubmitBankAccountForm = (currentForm) => {
    return dispatch(createUserBankAccountsAction(currentForm))
      .then((BankAccountResponse) => {
        if (successful(BankAccountResponse)) {
          return true;
        }
      })
      .catch((error) => {
        console.warn(error.message);
      });
  };

  const _handleSubmitVehicleForm = (currentForm) => {
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

  const _handleSuccess = () => {
    if (hasBankAccounts && formIndex >= formData.length - 1) {
      navigation.navigate('ParcelRequests');
    } else {
      _goToNext();
    }
  };

  const _renderItem = () => <View>{_.get(_.nth(formData, formIndex), 'content')}</View>;

  const _goToNext = () => {
    if (formIndex < formData.length - 1) {
      setFormIndex(formIndex + 1);
    } else {
      setFormIndex(0);
    }
  };

  const _goToPrevious = () => {
    if (formIndex > 0) {
      setFormIndex(formIndex - 1);
    } else {
      navigation.goBack();
    }
  };

  const _goToIndex = (index) => {
    if (index <= formIndex) {
      setFormIndex(index);
    }
  };

  const _getSender = () => {
    return _.get(parcelRequest, 'sender');
  };

  const _renderPagination = () => (
    <View style={[Layout.row, Layout.justifyContentBetween, Gutters.regularPadding]}>
      {formData.map((form, index) => {
        const buttonStyles = [
          styles.carouselDotStyle,
          { width: screenWidth / formData.length - 40 },
        ];
        if (index === formIndex) buttonStyles.push(styles.currentCarouselDotStyle);
        return <Button key={index} buttonStyle={buttonStyles} onPress={() => _goToIndex(index)} />;
      })}
    </View>
  );

  const formData = [
    {
      id: 'itemDetailsForm',
      content: (
        <>
          <Index title="Deliver Parcel" />
          <Divider />
          <View style={[Gutters.smallHMargin, Layout.fill]}>
            <ViewParcelCard parcelRequest={parcelRequest} />
            <UserSummaryCard user={_getSender()} />
            <View style={Layout.fill} />
            <Button
              title="Request to Deliver"
              buttonStyle={Layout.center}
              onPress={_handleSuccess}
            />
          </View>
        </>
      ),
    },
  ];

  if (!hasVehicles) {
    formData.push({
      id: 'createVehicleForm',
      content: (
        <>
          <Index title="Add vehicle" />
          <Divider />
          <View style={[Gutters.smallHMargin]}>
            <VehicleForm
              submitForm={_handleSubmitVehicleForm}
              onSuccess={_handleSuccess}
              initialValues={createVehicleModel({ collector_id: delivererId })}
              containerStyle={[Gutters.smallHMargin]}
            />
          </View>
        </>
      ),
    });
  }

  if (!hasBankAccounts) {
    formData.push({
      id: 'bankAccountForm',
      content: (
        <>
          <Index title="Bank Account Details" />
          <Divider />
          <Text style={[Fonts.textLarge, Gutters.smallHPadding]}>
            Before you can create a new send request, we will need your payment details.
          </Text>
          <Divider />
          <View style={[Gutters.smallHMargin]}>
            <BankAccountForm
              initialValues={userBankAccountModel({ delivererId: delivererId })}
              submitForm={_handleSubmitBankAccountForm}
              onSuccess={_handleSuccess}
            />
          </View>
        </>
      ),
    });
  }

  formData.push({
    id: 'deliveryDetailsForm',
    content: (
      <>
        <Index title="Final Amounts" />
        <Divider />
        <View style={[Gutters.smallHMargin]}>
          <DeliverParcelDetailsForm
            initialValues={_deliveryInitialValues()}
            submitForm={_handleSubmitDeliveryDetailsForm}
            onSuccess={_handleSuccess}
            parcelRequest={parcelRequest}
          />
        </View>
      </>
    ),
  });

  return (
    <FormScreenContainer>
      {_renderPagination()}
      {_renderItem()}
    </FormScreenContainer>
  );
};

DeliverParcelScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

DeliverParcelScreen.defaultProps = {};

export default DeliverParcelScreen;

const styles = StyleSheet.create({
  carouselDotStyle: {
    backgroundColor: Colors.inactiveCarouselDotsColour,
    borderRadius: 5,
    height: 5,
    marginHorizontal: 0,
    paddingHorizontal: 20,
    paddingVertical: 0,
    width: 100,
  },
  currentCarouselDotStyle: {
    backgroundColor: Colors.carouselDotsColour,
  },
});
