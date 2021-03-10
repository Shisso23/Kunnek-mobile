import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTransactionHistoryAction } from '../../../reducers/user-reducer/user-payments.actions';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';

const TransactionHistoryScreen = () => {
  const dispatch = useDispatch();

  const { transactionHistory, transactionHistoryLoading } = useSelector(userSelector);

  const _loadTransactions = () => {
    dispatch(getUserTransactionHistoryAction());
  };

  useFocusEffect(
    React.useCallback(() => {
      _loadTransactions();
    }, []),
  );
  return (
    <ScrollView>
      <Text>Transaction History</Text>
      <Text> {transactionHistoryLoading ? 'Loading transactionHistory' : 'My Transactions'}</Text>
      <Text>{JSON.stringify(transactionHistory, null, 2)}</Text>
    </ScrollView>
  );
};

export default TransactionHistoryScreen;
