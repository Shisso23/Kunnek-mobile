import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PeachMobile from 'react-native-peach-mobile';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { Colors } from '../../../theme/Variables';
import config from '../../../config';
import { successful } from '../../../helpers/errors.helper';
import PaymentSummary from '../../../components/molecules/payment-summary';
import { PAYMENT_TYPES } from '../../../services/sub-services/payment-service/payment.service';
import { flashService } from '../../../services';
import {
  complete,
  completePayment,
  createPaymentAction,
  fetchCheckoutId,
  fetchCheckoutStatus,
} from '../../../reducers/payment-reducer/payment.actions';
import {
  paymentSelector,
  setPaymentsLoadingAction,
} from '../../../reducers/payment-reducer/payment.reducer';
import { getServiceFee } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import { ScreenContainer } from '../../../components';
import { useTheme } from '../../../theme';
import Index from '../../../components/atoms/title';

const PaymentScreen = ({ route }) => {
  const { Fonts, Gutters, Layout } = useTheme();
  const { message, parcelRequest, totalAmount, paymentType, card, retry = false } = route.params;
  const dispatch = useDispatch();
  const [cvvNumber, setCvvNumber] = useState('');
  const navigation = useNavigation();
  const peachMobileRef = useRef(null);
  const { serviceFee } = useSelector((state) => state.parcelRequestReducer);
  const { paymentsLoading, payment } = useSelector(paymentSelector);

  useEffect(() => {
    if (parcelRequest) dispatch(getServiceFee(_.get(parcelRequest, 'id')));
  }, []);

  const renderPeachPayment = () => {
    return (
      <PeachMobile
        mode={config.peachPayments.peachPaymentMode}
        urlScheme="kunnekp2p"
        ref={peachMobileRef}
      />
    );
  };

  const onPay = async () => {
    const finalPayment = await dispatch(
      createPaymentAction({
        amount: _.get(parcelRequest, 'amount', totalAmount),
        status: 'pending',
        jobId: _.get(parcelRequest, 'id'),
        payableType: 'Card',
        payableId: _.get(card, 'id'),
        paymentType: PAYMENT_TYPES.verification,
      }),
    );
    if (successful(finalPayment)) {
      const peachPaymentType =
        retry && !_.isNil(_.get(finalPayment, 'peach_payment_type'))
          ? _.get(finalPayment, 'peach_payment_type')
          : 'DB';
      await dispatch(
        fetchCheckoutId(_.get(finalPayment.payload, 'id'), {
          payment_type: peachPaymentType,
        }),
      ).then((checkoutId) => {
        if (checkoutId) {
          createTransaction(checkoutId);
        }
      });
    }
  };

  const createTransaction = async (checkoutId) => {
    const cardType = _.get(card, 'cardType');
    if (!_.isNil(card)) {
      setIsLoading(true);
      if (peachMobileRef) {
        PeachMobile.createTransactionWithToken(
          checkoutId,
          _.get(card, 'tokenizedCard', ''),
          cardType === 'MASTERCARD' ? 'MASTER' : cardType,
          cvvNumber,
        )
          .then((transaction) => {
            peachMobileRef.current
              .submitTransaction(transaction)
              .then(finaliseTransaction)
              .then(() => {
                flashService.success('Payment completed successfully.');
              })
              .catch((error) => {
                flashService.error(error.message);
              })
              .finally(() => {
                setIsLoading(false);
              });
          })
          .catch((error) => {
            flashService.error(error.message);
            setIsLoading(false);
          });
      }
    }
  };

  const finaliseTransaction = (response) => {
    if (response) {
      return dispatch(completePayment(_.get(payment, 'id'))).then((paymentResponse) => {
        console.log(paymentResponse);
      });
    } else {
      throw new Error('Sorry, something went wrong with payment. Please try again.');
    }
  };

  const setIsLoading = (loading) => {
    dispatch(setPaymentsLoadingAction(loading));
  };

  return (
    <ScreenContainer>
      <View style={Gutters.regularHPadding}>
        <Index title="Make a Payment" />
        {!_.isEmpty(message) && (
          <View style={Gutters.regularPadding}>
            <Text style={Fonts.textCenter}>{message}</Text>
          </View>
        )}
        <PaymentSummary
          parcelRequest={parcelRequest}
          serviceFee={serviceFee}
          paymentType={paymentType}
          amount={totalAmount}
        />
        <Input
          keyboardType="decimal-pad"
          label="CVV Number"
          returnKeyType="done"
          onChangeText={(value) => setCvvNumber(value)}
        />
        <View style={Layout.alignItemsCenter}>
          <View>
            <Text style={styles.headingText}>Payment about to be made</Text>
            <Button title="Pay" onPress={onPay} loading={paymentsLoading} />
          </View>
        </View>
      </View>
      {renderPeachPayment()}
    </ScreenContainer>
  );
};

PaymentScreen.key = 'paymentScene';

PaymentScreen.propTypes = {
  route: PropTypes.object.isRequired,
  message: PropTypes.string,
  parcelRequest: PropTypes.object,
  totalAmount: PropTypes.number,
  isLoading: PropTypes.bool,
  paymentType: PropTypes.oneOf(Object.values(PAYMENT_TYPES)),
  retry: PropTypes.bool,
};

PaymentScreen.defaultProps = {
  message: '',
  parcelRequest: {},
  isLoading: false,
  retry: false,
  paymentType: PAYMENT_TYPES.verification,
  totalAmount: 0,
};

export default PaymentScreen;

const styles = StyleSheet.create({
  headingText: {
    color: Colors.white,
    fontSize: 28,
  },
});
