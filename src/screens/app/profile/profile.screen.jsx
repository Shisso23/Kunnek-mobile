import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import { getUserCreditCardsAction } from '../../../reducers/user-reducer/user-cards.actions';
import { getUserBankAccountsAction } from '../../../reducers/user-reducer/user-bank-account.actions';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { getUserVehiclesAction } from '../../../reducers/user-reducer/user-vehicles.actions';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    user,
    creditCards,
    creditCardsLoading,
    bankAccounts,
    bankAccountsLoading,
    vehicles,
    vehiclesLoading,
  } = useSelector(userSelector);

  const _loadUserMeta = () => {
    dispatch(getUserCreditCardsAction());
    dispatch(getUserBankAccountsAction());
    dispatch(getUserVehiclesAction());
  };

  useFocusEffect(
    React.useCallback(() => {
      _loadUserMeta();
    }, []),
  );

  return (
    <ScrollView>
      <Text>{user.fullName}</Text>
      <Text> {creditCardsLoading ? 'Loading credit cards' : 'My Debit/Credit Cards'}</Text>
      <Text>{JSON.stringify(creditCards, null, 2)}</Text>
      <Text> {bankAccountsLoading ? 'Loading bank accounts' : 'My bank accounts'}</Text>
      <Text>{JSON.stringify(bankAccounts, null, 2)}</Text>
      <Text> {vehiclesLoading ? 'Loading vehicles' : 'My vehicles'}</Text>
      <Text>{JSON.stringify(vehicles, null, 2)}</Text>
      <Button onPress={() => navigation.push('TransactionHistory')}>To History</Button>
    </ScrollView>
  );
};

ProfileScreen.propTypes = {};

ProfileScreen.defaultProps = {};

export default ProfileScreen;
