import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-elements';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { FormScreenContainer } from '../../../components';
import { useTheme } from '../../../theme';
import { SendParcelItemDetailsForm } from '../../../components/forms';
import Index from '../../../components/atoms/title';
import { Colors } from '../../../theme/Variables';
import SendParcelDeliverAndReceiverDetailsForm from '../../../components/forms/parcel-request/send-parcel-deliver-and-receiver-details.form';
import CreditCardForm from '../../../components/forms/credit-card/credit-card.form';
import { createParcelRequestAction } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import {
  createUserCreditCardAction,
  getUserCreditCardsAction,
} from '../../../reducers/user-reducer/user-cards.actions';
import {
  deliveryAndReceiverDetailsFormModel,
  itemDetailsFormModel,
} from '../../../models/app/parcel-request/parcel-request-form.model';
import { userCreditCardModel } from '../../../models/app/user/user-credit-card.model';

const SendParcelScreen = () => {
  const navigation = useNavigation();
  const { Fonts, Gutters, Layout } = useTheme();
  const senderId = useSelector((state) => state.userReducer.senderId);
  const creditCards = useSelector((state) => state.userReducer.creditCards);
  const dispatch = useDispatch();
  const [formIndex, setFormIndex] = React.useState(0);
  const [itemDetailsForm, setItemDetailsForm] = React.useState({});
  const [deliverAndReceiverDetailsForm, setDeliverAndReceiverDetailsForm] = React.useState({});
  const [creditCardForm, setCreditCardForm] = React.useState({});

  const hasCreditCards = Array.isArray(creditCards) ? creditCards.length > 0 : false;

  useEffect(() => {
    dispatch(getUserCreditCardsAction());
  });

  const _handleSubmitItemDetailsForm = (currentForm) => {
    setItemDetailsForm(currentForm);
    return Promise.resolve(currentForm);
  };

  const _handleSubmitDeliverAndReceiverDetailsForm = (currentForm) => {
    setDeliverAndReceiverDetailsForm(currentForm);
    const parcelRequestData = { ...itemDetailsForm, ...deliverAndReceiverDetailsForm, senderId };
    console.log(parcelRequestData);
    return dispatch(createParcelRequestAction(parcelRequestData));
  };

  const _handleSubmitCreditCardForm = (currentForm) => {
    setCreditCardForm(currentForm);
    return dispatch(createUserCreditCardAction(creditCardForm));
  };

  const _handleSuccess = () => {
    _goToNext();
  };

  const _handleCreditCardSuccess = () => {
    navigation.navigate('ParcelDeliveryDetails');
  };

  // eslint-disable-next-line react/prop-types
  const _renderItem = () => <View>{_.get(_.nth(formData, formIndex), 'content')}</View>;

  const _goToNext = () => {
    if (formIndex < formData.length - 1) {
      setFormIndex(formIndex + 1);
    } else {
      setFormIndex(0);
    }
  };

  const _renderPagination = () => (
    <View style={[Layout.row, Layout.justifyContentBetween, Gutters.regularPadding]}>
      {formData.map((form, index) => {
        const buttonStyles = [styles.carouselDotStyle];
        if (index === formIndex) buttonStyles.push(styles.currentCarouselDotStyle);
        // eslint-disable-next-line react/no-array-index-key
        return <Button key={index} buttonStyle={buttonStyles} />;
      })}
    </View>
  );

  const formData = [
    {
      content: (
        <>
          <Index title="Send Parcel" />
          <Divider />
          <SendParcelItemDetailsForm
            initialValues={itemDetailsFormModel()}
            submitForm={_handleSubmitItemDetailsForm}
            onSuccess={_handleSuccess}
            containerStyle={[Gutters.smallHMargin]}
          />
        </>
      ),
    },
    {
      content: (
        <>
          <Index title="Send Parcel" />
          <Divider />
          <SendParcelDeliverAndReceiverDetailsForm
            initialValues={deliveryAndReceiverDetailsFormModel()}
            submitForm={_handleSubmitDeliverAndReceiverDetailsForm}
            onSuccess={_handleSuccess}
            containerStyle={[Gutters.smallHMargin]}
          />
        </>
      ),
    },
  ];

  if (!hasCreditCards) {
    formData.push({
      content: (
        <>
          <Index title="My Debit/Credit Card" />
          <Divider />
          <Text style={[Fonts.textLarge, Gutters.smallHPadding]}>
            Before you can create a new send request, we will need your payment details.
          </Text>
          <Divider />
          <CreditCardForm
            initialValues={userCreditCardModel()}
            submitForm={_handleSubmitCreditCardForm}
            onSuccess={_handleCreditCardSuccess}
            containerStyle={[Gutters.smallHMargin]}
          />
        </>
      ),
    });
  }

  return (
    <FormScreenContainer>
      {_renderPagination()}
      {_renderItem()}
    </FormScreenContainer>
  );
};

SendParcelScreen.propTypes = {};

SendParcelScreen.defaultProps = {};

export default SendParcelScreen;

const styles = StyleSheet.create({
  carouselDotStyle: {
    backgroundColor: Colors.inactiveCarouselDotsColour,
    borderRadius: 5,
    height: 5,
    marginHorizontal: 0,
    paddingHorizontal: 20,
    width: 100,
  },
  currentCarouselDotStyle: {
    backgroundColor: Colors.carouselDotsColour,
  },
});
