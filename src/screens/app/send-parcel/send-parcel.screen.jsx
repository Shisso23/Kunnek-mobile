import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderBackButton } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';

import { useTheme } from '../../../theme';
import { SendParcelItemDetailsForm } from '../../../components/forms';
import Index from '../../../components/atoms/title';
import { Colors } from '../../../theme/Variables';
import SendParcelDeliverAndReceiverDetailsForm from '../../../components/forms/parcel-request/send-parcel-deliver-and-receiver-details.form';
import CreditCardForm from '../../../components/forms/credit-card/credit-card.form';
import { createParcelRequestAction } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import {
  createCheckoutIdAction,
  createUserCreditCardAction,
  getCardRegistrationStatusAction,
  getUserCreditCardsAction,
} from '../../../reducers/user-reducer/user-cards.actions';
import {
  deliveryAndReceiverDetailsFormModel,
  itemDetailsFormModel,
} from '../../../models/app/parcel-request/parcel-request-form.model';
import { userCreditCardModel } from '../../../models/app/user/user-credit-card.model';
import { getTomorrow } from '../../../helpers/date.helper';
import PeachMobile from 'react-native-peach-mobile';
import config from '../../../config';
import { flashService } from '../../../services';
import { successful } from '../../../helpers/errors.helper';
import { getCurrency } from '../../../helpers/payment.helper';
import { PAYMENT_TYPES } from '../../../services/sub-services/payment-service/payment.service';
import { tokenizeCardModel } from '../../../models/app/credit-card/tokenize-card.model';

const screenWidth = Dimensions.get('window').width;

const SendParcelScreen = () => {
  const navigation = useNavigation();
  const { Gutters, Layout } = useTheme();
  const senderId = useSelector((state) => state.userReducer.senderId);
  const creditCards = useSelector((state) => state.userReducer.creditCards);
  const dispatch = useDispatch();
  const [formIndex, setFormIndex] = useState(0);
  const [itemDetailsForm, setItemDetailsForm] = useState({});
  const [deliverAndReceiverDetailsForm, setDeliverAndReceiverDetailsForm] = useState({});
  const [creditCardForm, setCreditCardForm] = useState({});
  const [checkoutId, setCheckoutId] = useState('');
  const hasCreditCards = Array.isArray(creditCards) ? creditCards.length > 0 : false;
  const peachMobileRef = useRef(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <HeaderBackButton {...props} onPress={_goToPrevious} />,
    });
  }, [navigation, formIndex]);

  useEffect(() => {
    dispatch(getUserCreditCardsAction());
  }, []);

  const _createTransaction = (cardModel) => {
    return PeachMobile.createTransaction(
      checkoutId,
      '',
      _.get(cardModel, 'cardHolder'),
      _.get(cardModel, 'cardNumber'),
      _.get(cardModel, 'expiryMonth'),
      _.get(cardModel, 'expiryYear', ''),
      _.get(cardModel, 'cvv'),
    );
  };

  const _submitRegistration = (cardModel, transaction) => {
    return PeachMobile.submitRegistration(
      transaction,
      `${config.peachPayments.peachPaymentMode}`,
    ).catch((error) => console.warn('peach submit registration error', error.message));
  };

  const _getCardRegistrationStatus = () => {
    return dispatch(getCardRegistrationStatusAction(checkoutId)).then((cardRegStatus) =>
      _.get(cardRegStatus, 'id', ''),
    );
  };

  const _saveCreditCard = (cardModel, tokenizedCard) => {
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
        flashService.success('Added card successfully!');
        if (successful(creditCardResponse)) {
          _openVerificationPaymentScreen(creditCardResponse);
        }
      })
      .catch((error) => {
        flashService.error('Could not create card', error.message);
      });
  };

  const _openVerificationPaymentScreen = (card) => {
    navigation.navigate('Payment', {
      message: `We will make a charge of ${getCurrency()}1.00 on your credit card to verify that your card number and details are correct. This charge will be reversed once successful.`,
      totalAmount: 1,
      paymentType: PAYMENT_TYPES.verification,
      card,
      sceneToNavigateTo: 'ParcelRequests',
    });
  };

  const _process = (cardFormValues) => {
    const cardModel = tokenizeCardModel(cardFormValues);
    return dispatch(createCheckoutIdAction())
      .then((id) => {
        setCheckoutId(id);
        return _createTransaction(cardModel);
      })
      .then((transaction) => _submitRegistration(cardModel, transaction))
      .then(_getCardRegistrationStatus)
      .then((tokenizedCard) => _saveCreditCard(cardModel, tokenizedCard))
      .catch((error) => {
        console.warn({ error });
        flashService.error(error.message);
      });
  };

  const _renderPeachPayments = () => (
    <>
      <PeachMobile
        mode={config.peachPayments.peachPaymentMode}
        urlScheme={config.peachPayments.urlScheme}
        ref={peachMobileRef}
      />
    </>
  );

  const _handleSubmitItemDetailsForm = (currentForm) => {
    setItemDetailsForm(currentForm);
    return Promise.resolve(currentForm);
  };

  const _handleSubmitDeliverAndReceiverDetailsForm = (currentForm) => {
    setDeliverAndReceiverDetailsForm(currentForm);
    return dispatch(
      createParcelRequestAction({
        ..._getParcelRequest(),
        ...currentForm,
      }),
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.warn(error.message);
      });
  };

  const _handleSubmitCreditCardForm = async (cardFormValues) => {
    setCreditCardForm(cardFormValues);
    return _process(cardFormValues);
  };

  const _getParcelRequest = () => ({
    ...itemDetailsForm,
    ...deliverAndReceiverDetailsForm,
    senderId,
  });

  const _handleSuccess = () => {
    if (hasCreditCards && formIndex >= formData.length - 1) {
      navigation.navigate('ParcelRequests');
    } else {
      _goToNext();
    }
  };

  const _renderItem = () => (
    <ScrollView directionalLockEnabled={true}>
      {_.get(_.nth(formData, formIndex), 'content')}
    </ScrollView>
  );

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
          <Index title="Send Parcel" />
          <Divider />
          <View style={[Gutters.smallHMargin]}>
            <SendParcelDeliverAndReceiverDetailsForm
              initialValues={deliveryAndReceiverDetailsFormModel({
                latestDeliveryDateTime: getTomorrow('YYYY-MM-DD HH:mm'),
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
          <View style={[Gutters.smallHMargin]}>
            <Index title="My Debit/Credit Card" />
            <Divider color="transparent" />
            <CreditCardForm
              initialValues={userCreditCardModel(creditCardForm)}
              submitForm={_handleSubmitCreditCardForm}
              submitButtonStyle={styles.submitButtonStyle}
            />
            {_renderPeachPayments()}
          </View>
        </>
      ),
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
      style={styles.wrapperView}
    >
      {_renderPagination()}
      {_renderItem()}
    </KeyboardAvoidingView>
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
  currentCarouselDotStyle: {
    backgroundColor: Colors.carouselDotsColour,
  },
  submitButtonStyle: {
    width: '95%',
  },
  wrapperView: {
    marginBottom: Platform.OS === 'ios' ? 50 : 60,
  },
});
