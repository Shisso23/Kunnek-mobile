import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-elements';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderBackButton } from '@react-navigation/stack';
import PeachMobile from 'react-native-peach-mobile';

import { FormScreenContainer } from '../../../components';
import { tokenizeCardModel } from '../../../models/app/credit-card/tokenize-card.model';
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
  getCardRegistrationStatusAction,
} from '../../../reducers/user-reducer/user-cards.actions';
import { createCheckoutIdAction } from '../../../reducers/user-reducer/user-cards.actions';
import {
  deliveryAndReceiverDetailsFormModel,
  itemDetailsFormModel,
} from '../../../models/app/parcel-request/parcel-request-form.model';
import { userCreditCardModel } from '../../../models/app/user/user-credit-card.model';
import { successful } from '../../../helpers/errors.helper';
import { getCurrentDate } from '../../../helpers/date.helper';
import { PAYMENT_TYPES } from '../../../services/sub-services/payment-service/payment.service';
import { getCurrency } from '../../../helpers/payment.helper';
import config from '../../../config';
import { flashService } from '../../../services';

const screenWidth = Dimensions.get('window').width;

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
  const [checkoutID, setCheckoutID] = useState({});
  const peachMobileRef = useRef(null);
  const hasCreditCards = Array.isArray(creditCards) ? creditCards.length > 0 : false;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <HeaderBackButton {...props} onPress={_goToPrevious} />,
    });
  }, [navigation, formIndex]);

  useEffect(() => {
    dispatch(getUserCreditCardsAction());
    dispatch(createCheckoutIdAction()).then((id) => {
      setCheckoutID(`${id}`);
      return id;
    });
  }, []);

  const _handleSubmitItemDetailsForm = (currentForm) => {
    setItemDetailsForm(currentForm);
    return Promise.resolve(currentForm);
  };

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

  const createTransaction = async (cardModel) => {
    return PeachMobile.createTransaction(
      checkoutID,
      _.get(cardModel, 'paymentBrand'),
      _.get(cardModel, 'cardHolder'),
      _.get(cardModel, 'cardNumber'),
      _.get(cardModel, 'expiryMonth'),
      _.get(cardModel, 'expiryYear', ''),
      _.get(cardModel, 'cvv'),
    );
  };
  const submitRegistration = (cardModel, transaction) => {
    return PeachMobile.submitRegistration(transaction, `${config.peachPayments.peachPaymentMode}`)
      .then((response) => {
        console.log('peach Submit registration response', response);
        getCardRegistrationStatus(cardModel);
      })
      .catch((error) => console.log('peach submit registration error', { error }));
  };

  const createUserCreditCard = (cardModel, tokenizedCard) => {
    const finalData = {
      cardNumber: _.get(cardModel, 'obfuscatedCardNumber'),
      cardType: _.get(cardModel, 'paymentBrand'),
      cardHolder: _.get(cardModel, 'cardHolder'),
      expiryMonth: _.get(cardModel, 'expiryMonth'),
      expiryYear: _.get(cardModel, 'expiryYear'),
      senderId,
      tokenizedCard,
    };
    return dispatch(createUserCreditCardAction(finalData))
      .then((creditCardResponse) => {
        console.log('Create creditCard response', { creditCardResponse });
        flashService.success('added card successfully!');
        if (successful(creditCardResponse)) {
          _openVerificationPaymentScreen(creditCardResponse);
        }
      })
      .catch((error) => {
        console.log('Create credit card error', error);
        flashService.error('Could not create card');
      });
  };

  const getCardRegistrationStatus = (cardModel) => {
    return dispatch(getCardRegistrationStatusAction(checkoutID))
      .then((cardRegStatus) => {
        console.log({ cardRegStatus });
        const tokenizedCard = _.get(cardRegStatus, 'id', '');
        return createUserCreditCard(cardModel, tokenizedCard);
      })
      .catch((error) => {
        console.log('app submit transaction error ', error);
        return error;
      });
  };

  const _handleSubmitCreditCardForm = async (cardFormValues) => {
    setCreditCardForm(cardFormValues);
    if (peachMobileRef) {
      const cardModel = tokenizeCardModel(cardFormValues);
      console.log('card model', cardModel);
      return createTransaction(cardModel)
        .then((transaction) => {
          console.log({ transaction });
          return submitRegistration(cardModel, transaction);
        })
        .catch((error) => {
          console.log('Create transaction error', { error });
          console.warn({ error });
        });
    }
  };

  const _getParcelRequest = () => ({
    ...itemDetailsForm,
    ...deliverAndReceiverDetailsForm,
    senderId,
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
    <View
      style={[Layout.row, Layout.justifyContentBetween, Gutters.regularPadding, styles.pagination]}
    >
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
          <Index title="Send Parcel" />
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
          <View style={[Gutters.smallHMargin, styles.creditCardForm]}>
            <Index title="My Debit/Credit Card" />
            <Divider />
            <Text style={[Fonts.textLarge, Gutters.smallHPadding]}>
              Before you can create a new send request, we will need your payment details.
            </Text>
            <Divider />
            <CreditCardForm
              initialValues={userCreditCardModel(creditCardForm)}
              submitForm={_handleSubmitCreditCardForm}
            />
            <PeachMobile
              mode={config.peachPayments.peachPaymentMode}
              urlScheme="com.kunnek.payments"
              ref={peachMobileRef}
            />
          </View>
        </>
      ),
    });
  }

  return (
    <FormScreenContainer contentContainerStyle={formIndex === 2 ? styles.formContainer : {}}>
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
    paddingVertical: 0,
    width: 100,
  },
  creditCardForm: { height: '95%' },
  currentCarouselDotStyle: {
    backgroundColor: Colors.carouselDotsColour,
  },
  formContainer: {
    flex: 1,
  },
  pagination: { flex: 0.1 },
});
