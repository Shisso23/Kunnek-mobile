import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PeachMobile from 'react-native-peach-mobile';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Input } from 'react-native-elements';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { Colors } from '../../../theme/Variables';
import config from '../../../config';
import { successful } from '../../../helpers/errors.helper';
import PaymentSummary from '../../../components/molecules/payment-summary';
import { PAYMENT_TYPES } from '../../../services/sub-services/payment-service/payment.service';
import { flashService } from '../../../services';
import {
  completePayment,
  createPaymentAction,
  fetchCheckoutId,
  getPayments,
} from '../../../reducers/payment-reducer/payment.actions';
import {
  paymentSelector,
  setPaymentsLoadingAction,
} from '../../../reducers/payment-reducer/payment.reducer';
import { getServiceFee } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import { ScreenContainer } from '../../../components';
import { useTheme } from '../../../theme';
import Index from '../../../components/atoms/title';
import { getUserTransaction } from '../../../reducers/user-reducer/user-payments.actions';

const PaymentScreen = ({ route }) => {
  const { Common, Fonts, Gutters, Layout } = useTheme();
  const {
    message,
    parcelRequest,
    totalAmount,
    paymentType,
    card,
    sceneToNavigateTo = 'TransactionDetails',
    retry = false,
  } = route.params;
  const dispatch = useDispatch();
  const [cvvNumber, setCvvNumber] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const peachMobileRef = useRef(null);
  const { serviceFee } = useSelector((state) => state.parcelRequestReducer);
  const { paymentsLoading, payment } = useSelector(paymentSelector);

  useEffect(() => {
    if (parcelRequest) dispatch(getServiceFee(_.get(parcelRequest, 'id')));
  }, []);

  const _renderPeachPayment = () => {
    return (
      <PeachMobile
        mode={config.peachPayments.peachPaymentMode}
        urlScheme={config.peachPayments.urlScheme}
        ref={peachMobileRef}
      />
    );
  };

  const _getExistingPayments = (creditCard) => {
    return dispatch(getPayments({ payable_id: _.get(creditCard, 'id') }));
  };

  const _onPay = async () => {
    const payments = await _getExistingPayments(card);
    let finalPayment = _.nth(payments, 0);
    if (_.isEmpty(_.get(finalPayment, 'id'))) {
      finalPayment = await dispatch(
        createPaymentAction({
          amount: _.get(parcelRequest, 'amount', totalAmount),
          status: 'pending',
          jobId: _.get(parcelRequest, 'id'),
          payableType: 'Card',
          payableId: _.get(card, 'id'),
          paymentType: PAYMENT_TYPES.verification,
        }),
      );
    }
    if (successful(finalPayment)) {
      const peachPaymentType =
        retry && !_.isNil(_.get(finalPayment, 'peach_payment_type'))
          ? _.get(finalPayment, 'peach_payment_type')
          : 'DB';
      dispatch(
        fetchCheckoutId(_.get(finalPayment, 'id'), {
          payment_type: peachPaymentType,
        }),
      ).then((checkoutId) => {
        if (checkoutId) {
          _createTransaction(checkoutId, finalPayment);
        }
      });
    }
  };

  const _createTransaction = async (checkoutId, finalPayment) => {
    const cardType = _.get(card, 'cardType');
    if (!_.isNil(card)) {
      _setIsLoading(true);
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
              .then((response) => _finaliseTransaction(response, finalPayment))
              .catch((error) => {
                setError(error.message);
                flashService.error(error.message);
              })
              .finally(() => {
                _setIsLoading(false);
              });
          })
          .catch((error) => {
            setError(error.message);
            flashService.error(error.message);
            _setIsLoading(false);
          });
      }
    }
  };

  const _finaliseTransaction = (response, finalPayment) => {
    if (response) {
      const paymentId = _.get(finalPayment, 'id');
      return dispatch(completePayment(paymentId)).then((paymentResponse) => {
        return dispatch(getUserTransaction(paymentId)).then((transaction) => {
          const status = _.get(paymentResponse, 'success', false);
          if (status) {
            flashService.success('Payment completed successfully');
            navigation.dispatch(StackActions.popToTop());
            navigation.navigate(sceneToNavigateTo, { payment: transaction });
          } else {
            const errorMessage = `Payment was not successful. Please try again. Reason: ${_.get(
              paymentResponse,
              'reason',
              '',
            )}`;
            setError(errorMessage);
            flashService.error(errorMessage);
          }
        });
      });
    } else {
      return Promise.reject('Sorry, something went wrong with payment. Please try again.');
    }
  };

  const _setIsLoading = (loading) => {
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
            <Button title="Pay" onPress={_onPay} loading={paymentsLoading} />
          </View>
          <View>{!_.isEmpty(error) && <Text style={Common.errorStyle}>{error}</Text>}</View>
        </View>
      </View>
      {_renderPeachPayment()}
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
