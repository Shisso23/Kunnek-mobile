import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { FormScreenContainer } from '../../../components';
import Index from '../../../components/atoms/title';
import { BankAccountForm } from '../../../components/forms';
import { successful } from '../../../helpers/errors.helper';
import { userBankAccountModel } from '../../../models/app/user/user-bank-account.model';
import { createUserBankAccountsAction } from '../../../reducers/user-reducer/user-bank-account.actions';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { useTheme } from '../../../theme';

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

  const _formSuccess = () => {
    navigation.goBack();
  };

  const { Gutters } = useTheme();
  const { delivererId } = useSelector(userSelector);

  return (
    <FormScreenContainer>
      <Index title="Add Bank Account" />
      <Divider />
      <View style={Gutters.smallHMargin}>
        <BankAccountForm
          submitForm={_handleSubmit}
          onSuccess={_formSuccess}
          initialValues={userBankAccountModel({ collector_id: delivererId })}
          containerStyle={Gutters.smallHMargin}
        />
      </View>
    </FormScreenContainer>
  );
};

AddBankAccountScreen.propTypes = {};

export default AddBankAccountScreen;
