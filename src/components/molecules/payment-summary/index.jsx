import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Colors } from '../../../theme/Variables';
import { getCurrency } from '../../../helpers/payment.helper';
import { PAYMENT_TYPES } from '../../../services/sub-services/payment-service/payment.service';

const PaymentSummary = ({ paymentType, amount, parcelRequest, serviceFee }) => {
  const renderDelivererAmounts = () => (
    <View>
      {renderRow({
        label: 'Offer Amount:',
        value: _.get(parcelRequest, 'price', 0.0),
      })}
      {renderRow({
        label: 'Service Fee Amount:',
        value: Number(serviceFee).toFixed(2),
      })}
      {renderRow({
        label: 'Your Total Earnings:',
        value: Number(getTotalValue()).toFixed(2),
        extraRowStyles: [styles.totalRowStyle],
        extraTextStyles: [styles.totalTextStyle],
      })}
    </View>
  );

  const renderVerificationAmounts = () => (
    <View>
      {renderRow({
        label: 'Total To Pay',
        value: Number(getTotalValue()).toFixed(2),
        extraRowStyles: [styles.totalRowStyle],
        extraTextStyles: [styles.totalTextStyle],
      })}
    </View>
  );

  const renderSenderAmounts = () => (
    <View>
      {renderRow({
        label: 'Your Offer:',
        value: _.get(parcelRequest, 'price', 0.0),
      })}
      {renderRow({
        label: 'Service Fee:',
        value: Number(serviceFee).toFixed(2),
      })}
      {renderRow({
        label: 'Total Due by Sender:',
        value: Number(getTotalValue()).toFixed(2),
        extraRowStyles: [styles.totalRowStyle],
        extraTextStyles: [styles.totalTextStyle],
      })}
    </View>
  );

  const renderRow = ({ label, value, extraRowStyles = [], extraTextStyles = [] }) => (
    <View style={[styles.rowStyle, ...extraRowStyles]}>
      <Text style={[styles.leftSideStyle, ...extraTextStyles]}>{label}</Text>
      <Text style={[styles.rightSideStyle, ...extraTextStyles]}>
        {getCurrency()} {value}
      </Text>
    </View>
  );

  const getTotalValue = () => {
    switch (paymentType) {
      case PAYMENT_TYPES.paidBySender:
        return Number(_.get(parcelRequest, 'sender_total_amount', 0.0));
      case PAYMENT_TYPES.paidToDeliverer:
        return Number(_.get(parcelRequest, 'deliverer_total_amount', 0.0));
      default:
        return amount;
    }
  };

  const _getContent = () => {
    let content;
    switch (paymentType) {
      case PAYMENT_TYPES.paidBySender:
        content = renderSenderAmounts();
        break;
      case PAYMENT_TYPES.paidToDeliverer:
        content = renderDelivererAmounts();
        break;
      default:
        content = renderVerificationAmounts();
        break;
    }
    return content;
  };

  return <View>{_getContent()}</View>;
};

PaymentSummary.propTypes = {
  amount: PropTypes.number.isRequired,
  parcelRequest: PropTypes.object.isRequired,
  serviceFee: PropTypes.number.isRequired,
  paymentType: PropTypes.oneOf(Object.values(PAYMENT_TYPES)),
};

PaymentSummary.defaultProps = {
  paymentType: PAYMENT_TYPES.paidBySender,
};

export default PaymentSummary;

const styles = StyleSheet.create({
  leftSideStyle: {
    alignSelf: 'flex-start',
  },
  rightSideStyle: {
    alignSelf: 'flex-end',
    color: Colors.teal,
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  totalRowStyle: {
    borderBottomWidth: 1,
    borderColor: Colors.backgroundGrey20,
    borderTopWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
  totalTextStyle: {
    fontWeight: 'bold',
  },
});
