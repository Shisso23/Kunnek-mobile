import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTransactionHistoryAction } from '../../../reducers/user-reducer/user-payments.actions';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import useTheme from '../../../theme/hooks/useTheme';
import { TransactionHistoryCard, LoadingComponent } from '../../../components';

const TransactionHistoryScreen = () => {
  const dispatch = useDispatch();
  const { Gutters } = useTheme();

  const { transactionHistory, transactionHistoryLoading } = useSelector(userSelector);

  const _loadTransactions = () => {
    dispatch(getUserTransactionHistoryAction());
  };

  useFocusEffect(
    React.useCallback(() => {
      _loadTransactions();
    }, []),
  );

  return !transactionHistoryLoading ? (
    <ScrollView style={[Gutters.smallHMargin]}>
      <Text h1>Transaction History</Text>
      <TransactionHistoryCard items={transactionHistory} />
    </ScrollView>
  ) : (
    <LoadingComponent />
  );
};

export default TransactionHistoryScreen;
