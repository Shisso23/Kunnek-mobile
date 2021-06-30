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
import SendParcelDeliverAndReceiverDetailsForm from '../../../components/forms/parcel-request/send-parcel-deliver-and-receiver-details.form';
import CreditCardForm from '../../../components/forms/credit-card/credit-card.form';
import { createParcelRequestAction } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import {
  createUserCreditCardAction,
  tokenizeCard,
} from '../../../reducers/user-reducer/user-cards.actions';
import { deliveryAndReceiverDetailsFormModel } from '../../../models/app/parcel-request/parcel-request-form.model';
import { userCreditCardModel } from '../../../models/app/user/user-credit-card.model';
import { successful } from '../../../helpers/errors.helper';
import { getCurrentDate } from '../../../helpers/date.helper';
import { PAYMENT_TYPES } from '../../../services/sub-services/payment-service/payment.service';
import { getCurrency } from '../../../helpers/payment.helper';
import { tokenizeCardModel } from '../../../models/app/credit-card/tokenize-card.model';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { getUserBankAccountsAction } from '../../../reducers/user-reducer/user-bank-account.actions';

const screenWidth = Dimensions.get('window').width;

const DeliverParcelScreen = ({ route }) => {
  const navigation = useNavigation();
  const { parcelRequest } = route.params;
  const { Fonts, Gutters, Layout } = useTheme();
  const { delivererId, bankAccounts } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [formIndex, setFormIndex] = useState(0);
  // const [itemDetailsForm, setItemDetailsForm] = useState({});
  const [deliverAndReceiverDetailsForm, setDeliverAndReceiverDetailsForm] = useState({});
  const [creditCardForm, setCreditCardForm] = useState({});

  const hasCreditCards = Array.isArray(bankAccounts) ? bankAccounts.length > 0 : false;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <HeaderBackButton {...props} onPress={_goToPrevious} />,
    });
  }, [navigation, formIndex]);

  useEffect(() => {
    dispatch(getUserBankAccountsAction());
  }, []);

  // const _handleSubmitItemDetailsForm = (currentForm) => {
  //   setItemDetailsForm(currentForm);
  //   return Promise.resolve(currentForm);
  // };

  const _handleSubmitDeliverAndReceiverDetailsForm = (currentForm) => {
    setDeliverAndReceiverDetailsForm(currentForm);
    return dispatch(createParcelRequestAction(_getParcelRequest()))
      .then((response) => {
        if (successful(response)) {
          _openParcelRequestsScreen();
        }
      })
      .catch((error) => {
        console.warn(error.message);
      });
  };

  const _handleSubmitCreditCardForm = (currentForm) => {
    setCreditCardForm(currentForm);
    return dispatch(tokenizeCard(tokenizeCardModel(currentForm))).then((response) => {
      const { id, card } = response.data;
      const finalData = {
        delivererId,
        obfuscatedCardNumber: `************${_.get(card, 'last4Digits')}`,
        cardType: _.get(creditCardForm, 'cardType'),
        tokenizedCard: id,
        cardHolder: _.get(card, 'holder'),
        expiryMonth: _.get(card, 'expiryMonth'),
        expiryYear: _.get(card, 'expiryYear'),
      };

      return dispatch(createUserCreditCardAction(finalData)).then((creditCardResponse) => {
        if (successful(creditCardResponse)) {
          _openVerificationPaymentScreen(finalData);
        }
      });
    });
  };

  const _getParcelRequest = () => ({
    // ...itemDetailsForm,
    ...deliverAndReceiverDetailsForm,
    delivererId,
  });

  const _openVerificationPaymentScreen = (card) => {
    navigation.navigate('Payment', {
      message: `We will make a charge of ${getCurrency()}1.00 on your credit card to verify that your card number and details are correct. This charge will be reversed once successful.`,
      totalAmount: 1,
      paymentType: PAYMENT_TYPES.verification,
      card,
      parcelRequest: _getParcelRequest(),
    });
  };

  const _openParcelRequestsScreen = () => {
    navigation.navigate('ParcelRequests');
  };

  const _handleSuccess = () => {
    if (hasCreditCards && formIndex >= formData.length - 1) {
      navigation.navigate('ParcelRequests');
    } else {
      _goToNext();
    }
  };

  const _handleCreditCardSuccess = (returnedData) => {
    if (successful(returnedData)) {
      navigation.navigate('ParcelDeliveryDetails');
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
    {
      id: 'deliveryAndReceiverDetailsForm',
      content: (
        <>
          <Index title="Final Amounts" />
          <Divider />
          <View style={[Gutters.smallHMargin]}>
            <SendParcelDeliverAndReceiverDetailsForm
              initialValues={deliveryAndReceiverDetailsFormModel({
                latestDeliveryDateTime: getCurrentDate(),
                ...deliverAndReceiverDetailsForm,
              })}
              submitForm={_handleSubmitDeliverAndReceiverDetailsForm}
              onSuccess={_handleSuccess}
            />
          </View>
        </>
      ),
    },
  ];

  if (!hasCreditCards) {
    formData.push({
      id: 'creditCardForm',
      content: (
        <>
          <Index title="Payment Details" />
          <Divider />
          <Text style={[Fonts.textLarge, Gutters.smallHPadding]}>
            Before you can create a new send request, we will need your payment details.
          </Text>
          <Divider />
          <View style={[Gutters.smallHMargin]}>
            <CreditCardForm
              initialValues={userCreditCardModel(creditCardForm)}
              submitForm={_handleSubmitCreditCardForm}
              onSuccess={_handleCreditCardSuccess}
            />
          </View>
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
