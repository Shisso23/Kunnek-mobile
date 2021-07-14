import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { FormScreenContainer } from '../../../components';
import Index from '../../../components/atoms/title';
import { BankAccountForm } from '../../../components/forms';
import { successful } from '../../../helpers/errors.helper';
import { userBankAccountModel } from '../../../models/app/user/user-bank-account.model';
import { createUserBankAccountsAction } from '../../../reducers/user-reducer/user-bank-account.actions';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/Variables';

const AddBankAccountScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const _handleSubmit = (currentForm) => {
    return dispatch(createUserBankAccountsAction(currentForm))
      .then((BankAccountResponse) => {
        if (successful(BankAccountResponse)) {
          return true;
        }
      })
      .catch((error) => {
        console.warn(error.message);
      });
  };

  const _back = () => navigation.goBack();

  const _formSuccess = () => {
    navigation.goBack();
  };

  const { Gutters, Layout } = useTheme();
  const { delivererId } = useSelector(userSelector);

  return (
    <FormScreenContainer>
      <Index title="Payment Details" />
      <Divider />
      <View style={[Gutters.smallHMargin, Layout.fill]}>
        <BankAccountForm
          submitForm={_handleSubmit}
          onSuccess={_formSuccess}
          initialValues={userBankAccountModel({ collector_id: delivererId })}
          containerStyle={Gutters.smallHMargin}
          submitText="Add Bank Account"
        />
      </View>
      <SafeAreaView>
        <Button
          onPress={_back}
          title={'Cancel'}
          containerStyle={styles.buttonStyle}
          buttonStyle={styles.clearButtonStyle}
          titleStyle={[styles.clearButtonTextStyle]}
        />
      </SafeAreaView>
    </FormScreenContainer>
  );
};

AddBankAccountScreen.propTypes = {};

export default AddBankAccountScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '90%',
    alignSelf: 'center',
  },
  clearButtonStyle: {
    backgroundColor: Colors.transparent,
  },
  clearButtonTextStyle: {
    color: Colors.darkerGrey,
  },
});
