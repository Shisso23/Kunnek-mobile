import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, SafeAreaView } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { HeaderBackButton } from '@react-navigation/stack';
import PropTypes from 'prop-types';

import { FormScreenContainer } from '../../../components';
import { useTheme } from '../../../theme';
import { SendParcelItemDetailsForm } from '../../../components/forms';
import Index from '../../../components/atoms/title';
import { Colors } from '../../../theme/Variables';
import SendParcelDeliverAndReceiverDetailsForm from '../../../components/forms/parcel-request/send-parcel-deliver-and-receiver-details.form';
import {
  deliveryAndReceiverDetailsFormModel,
  itemDetailsFormModel,
} from '../../../models/app/parcel-request/parcel-request-form.model';
import { successful } from '../../../helpers/errors.helper';
import { updateParcelRequestAction } from '../../../reducers/parcel-request-reducer/parcel-request.actions';

const screenWidth = Dimensions.get('window').width;

const EditParcelScreen = ({ route }) => {
  const navigation = useNavigation();
  const parcelRequest = route.params;
  const { Gutters, Layout } = useTheme();
  const dispatch = useDispatch();
  const [formIndex, setFormIndex] = useState(0);
  const [itemDetailsForm, setItemDetailsForm] = useState(itemDetailsFormModel(parcelRequest));
  const [deliverAndReceiverDetailsForm, setDeliverAndReceiverDetailsForm] = useState(
    deliveryAndReceiverDetailsFormModel(parcelRequest),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <HeaderBackButton {...props} onPress={_goToPrevious} />,
    });
  }, [navigation, formIndex]);

  const _handleSubmitItemDetailsForm = (currentForm) => {
    setItemDetailsForm(currentForm);
    return Promise.resolve(currentForm);
  };

  const _handleSubmitDeliverAndReceiverDetailsForm = (currentForm) => {
    setDeliverAndReceiverDetailsForm(currentForm);
    return dispatch(
      updateParcelRequestAction(_.get(parcelRequest, 'id'), { ...itemDetailsForm, ...currentForm }),
    )
      .then((response) => {
        if (successful(response)) {
          _openParcelRequestsScreen();
        }
      })
      .catch((error) => {
        console.warn(error.message);
      });
  };

  const _openParcelRequestsScreen = () => {
    navigation.navigate('ParcelRequests');
  };

  const _handleSuccess = () => {
    if (formIndex >= formData.length - 1) {
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
          <Index title="Send Parcel" />
          <Divider />
          <View style={[Gutters.smallHMargin]}>
            <SendParcelItemDetailsForm
              initialValues={itemDetailsFormModel(itemDetailsForm)}
              submitForm={_handleSubmitItemDetailsForm}
              onSuccess={_handleSuccess}
            />
          </View>
        </>
      ),
    },
    {
      id: 'deliveryAndReceiverDetailsForm',
      content: (
        <>
          <Index title="Edit Parcel" />
          <Divider />
          <View style={[Gutters.smallHMargin]}>
            <SendParcelDeliverAndReceiverDetailsForm
              initialValues={deliveryAndReceiverDetailsFormModel(deliverAndReceiverDetailsForm)}
              submitForm={_handleSubmitDeliverAndReceiverDetailsForm}
              onSuccess={_handleSuccess}
            />
          </View>
        </>
      ),
    },
  ];

  return (
    <FormScreenContainer>
      {_renderPagination()}
      <SafeAreaView>{_renderItem()}</SafeAreaView>
    </FormScreenContainer>
  );
};

EditParcelScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default EditParcelScreen;

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
