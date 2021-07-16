import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderBackButton } from '@react-navigation/stack';

import { CreditCardTokenization, FormScreenContainer } from '../../../components';
import { useTheme } from '../../../theme';
import { SendParcelItemDetailsForm } from '../../../components/forms';
import Index from '../../../components/atoms/title';
import { Colors } from '../../../theme/Variables';
import SendParcelDeliverAndReceiverDetailsForm from '../../../components/forms/parcel-request/send-parcel-deliver-and-receiver-details.form';
import CreditCardForm from '../../../components/forms/credit-card/credit-card.form';
import { createParcelRequestAction } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import { getUserCreditCardsAction } from '../../../reducers/user-reducer/user-cards.actions';
import {
  deliveryAndReceiverDetailsFormModel,
  itemDetailsFormModel,
} from '../../../models/app/parcel-request/parcel-request-form.model';
import { userCreditCardModel } from '../../../models/app/user/user-credit-card.model';
import { getTomorrow } from '../../../helpers/date.helper';

const screenWidth = Dimensions.get('window').width;

const SendParcelScreen = () => {
  const navigation = useNavigation();
  const { Gutters, Layout } = useTheme();
  const senderId = useSelector((state) => state.userReducer.senderId);
  const creditCards = useSelector((state) => state.userReducer.creditCards);
  const dispatch = useDispatch();
  const [formIndex, setFormIndex] = React.useState(0);
  const [itemDetailsForm, setItemDetailsForm] = React.useState({});
  const [deliverAndReceiverDetailsForm, setDeliverAndReceiverDetailsForm] = React.useState({});
  const [creditCardForm, setCreditCardForm] = React.useState({});
  const creditCardTokenizationRef = useRef(null);
  const hasCreditCards = Array.isArray(creditCards) ? creditCards.length > 0 : false;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <HeaderBackButton {...props} onPress={_goToPrevious} />,
    });
  }, [navigation, formIndex]);

  useEffect(() => {
    dispatch(getUserCreditCardsAction());
  }, []);

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
    if (creditCardTokenizationRef) {
      return creditCardTokenizationRef.current.process(cardFormValues);
    }
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
                latestDeliveryDateTime: getTomorrow('YYYY-MM-DD:HH:mm'),
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
            <Divider color="transparent" />
            <CreditCardForm
              initialValues={userCreditCardModel(creditCardForm)}
              submitForm={_handleSubmitCreditCardForm}
              submitButtonStyle={styles.submitButtonStyle}
            />
            <CreditCardTokenization
              ref={creditCardTokenizationRef}
              sceneToNavigateToOnSuccess="TransactionDetails"
              saveMethod="update"
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
  creditCardForm: { height: '97%' },
  currentCarouselDotStyle: {
    backgroundColor: Colors.carouselDotsColour,
  },
  pagination: { flex: 0.1 },
  submitButtonStyle: {
    alignSelf: 'center',
    bottom: 0,
    position: 'absolute',
    width: '95%',
  },
});
