import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';

import ViewCard from '../../../components/molecules/view-card/index';
import useTheme from '../../../theme/hooks/useTheme';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import ProfilePicture from '../../../components/atoms/profile-picture/index';
import { getCurrency, getTransactionTypeColour } from '../../../helpers/payment.helper';
import StatusBox from '../../../components/atoms/status-box/index';
import { useState } from 'react';
import { useEffect } from 'react';
import { getTransaction } from '../../../reducers/payment-reducer/payment.actions';

const TransactionDetailScreen = ({ route }) => {
  const [payment, setPayment] = useState(_.get(route, 'params.payment'));
  const [loading, setLoading] = useState(true);
  const { Custom, Common, Layout, Gutters } = useTheme();
  const { user } = useSelector(userSelector);
  const paymentStatus = _.get(payment, 'status', '');
  const dispatch = useDispatch();

  const amount = _.get(payment, 'amount', 0);
  const displayAmount = parseInt(amount).toFixed(2);

  useEffect(() => {
    if (typeof payment === 'string') {
      dispatch(getTransaction(payment)).then((paymentModel) => {
        setPayment(paymentModel);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  return loading ? null : (
    <View style={[Gutters.smallHMargin, styles.container]}>
      <Text style={[Custom.headerTitle]}>Transaction Details</Text>
      <View style={[Layout.alignSelfCenter, Layout.alignItemsCenter, Gutters.regularTMargin]}>
        <ProfilePicture user={user} style={styles.profilePicture} />
        <Text style={[Gutters.smallTMargin]}>
          {_.get(user, 'firstName', '')} {_.get(user, 'lastName', '')}
        </Text>
        <Text style={styles.amount}>
          <Text>{getCurrency()}</Text>
          {displayAmount}
        </Text>
      </View>
      <ViewCard style={[Gutters.largeTMargin]}>
        <View>
          <Text>Invoice No.</Text>
          <Text style={[Gutters.smallVMargin, Common.smallGreyText]}>
            #{_.get(payment, 'invoiceNumber', '')}
          </Text>
        </View>
        <View>
          <Text>Date</Text>
          <Text style={[Gutters.smallVMargin, Common.smallGreyText]}>
            {moment(new Date(_.get(payment, 'date', ''))).format('M/DD/YYYY')}
          </Text>
        </View>
      </ViewCard>
      {_.get(payment, 'paymentType', '').toLowerCase() !== 'verification' && (
        <ViewCard>
          <View>
            <View>
              <Text>Items</Text>
              <Text style={[Gutters.smallVMargin, Common.smallGreyText]}>
                {_.get(payment, 'job.description', '')}
              </Text>
            </View>
            <View>
              <Text>Sender</Text>
              <Text style={[Gutters.smallVMargin, Common.smallGreyText]}>
                {_.get(payment, 'sender.firstName', '')}
              </Text>
            </View>
          </View>

          <View>
            <View>
              <Text>Amount</Text>
              <Text style={[Gutters.smallVMargin, Common.rightAlignText, Common.smallGreyText]}>
                {getCurrency()}
                {displayAmount}
              </Text>
            </View>

            <View>
              <Text>Driver</Text>
              <Text style={[Gutters.smallVMargin, Common.smallGreyText]}>
                {_.get(payment.driver, 'firstName', '')}
              </Text>
            </View>
          </View>
        </ViewCard>
      )}
      <ViewCard style={[Layout.column, Layout.justifyContentBetween]}>
        <View>
          <Text>Payment</Text>
          <Text style={Gutters.smallVMargin}>
            {paymentStatus === 'failed'
              ? `Reason for failure: ${_.get(payment, 'reasonForFailure', '')}`
              : ''}
          </Text>
        </View>
        <View style={[Layout.colCenter, styles.paymentStatus]}>
          <StatusBox color={getTransactionTypeColour(payment)} status={paymentStatus} />
        </View>
      </ViewCard>
    </View>
  );
};

TransactionDetailScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

TransactionDetailScreen.defaultProps = {};

const styles = StyleSheet.create({
  amount: { fontSize: 25 },
  container: { flex: 1 },
  paymentStatus: { borderRadius: 5 },
  profilePicture: {
    height: 90,
    width: 90,
  },
});

export default TransactionDetailScreen;
