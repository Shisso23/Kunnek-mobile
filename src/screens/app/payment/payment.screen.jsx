import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PeachMobile from 'react-native-peach-mobile';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { Colors } from '../../../theme/Variables';
import config from '../../../config';
import { successful } from '../../../helpers/errors.helper';
import PaymentSummary from '../../../components/molecules/payment-summary';
import { PAYMENT_TYPES } from '../../../services/sub-services/payment-service/payment.service';
import { flashService } from '../../../services';
import {
  createPaymentAction,
  fetchCheckoutId,
} from '../../../reducers/payment-reducer/payment.actions';

import { setPaymentsLoadingAction } from '../../../reducers/payment-reducer/payment.reducer';
import { getServiceFee } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import { ScreenContainer } from '../../../components';
import { useTheme } from '../../../theme';
import Index from '../../../components/atoms/title';

const PaymentScreen = ({ isLoading, route, retry = false }) => {
  const { Fonts, Gutters, Layout } = useTheme();
  const { message, parcelRequest, totalAmount, paymentType, card } = route.params;
  const dispatch = useDispatch();
  const [cvvNumber, setCvvNumber] = useState('');
  const peachMobileRef = useRef(null);
  const { checkoutId } = useSelector((state) => state.paymentReducer);
  const { serviceFee } = useSelector((state) => state.parcelRequestReducer);

  useEffect(() => {
    dispatch(getServiceFee(_.get(parcelRequest, 'id')));
  }, [parcelRequest]);

  const renderPeachPayment = () => {
    return (
      <PeachMobile mode={config.peachPaymentMode} urlScheme="kunnekp2p" ref={peachMobileRef} />
    );
  };

  const onPay = async () => {
    let result = { success: false };
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
      );
      if (checkoutId !== null) {
        result = await createTransaction();
      }
    }

    return result;
  };

  const createTransaction = async () => {
    if (!_.isNil(card)) {
      setIsLoading(true);
      if (peachMobileRef) {
        PeachMobile.createTransactionWithToken(
          checkoutId,
          _.get(card, 'tokenizedCard', ''),
          _.get(card, 'cardType'),
          cvvNumber,
        )
          .then((transaction) => {
            PeachMobile.submitTransaction(transaction, config.peachPaymentMode)
              .then(async (response) => {
                if (response) {
                  flashService.success('Payment Processing...');
                } else {
                  flashService.error('Sorry, something went wrong with payment. Please try again.');
                }
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
            <Button title="Pay" onPress={onPay} loading={isLoading} />
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
