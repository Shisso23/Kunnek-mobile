import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { FormScreenContainer } from '../../../components';
import Index from '../../../components/atoms/title';
import { BankAccountForm } from '../../../components/forms';
import { successful } from '../../../helpers/errors.helper';
import { useTheme } from '../../../theme';
import { editUserBankAccountsAction } from '../../../reducers/user-reducer/user-bank-account.actions';

const EditBankAccountScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { bankAccount } = route.params;

  const _handleSubmit = (currentForm) => {
    return dispatch(editUserBankAccountsAction(currentForm))
      .then((bankAccountResponse) => {
        if (successful(bankAccountResponse)) {
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

  return (
    <FormScreenContainer>
      <Index title="Edit bank account" />
      <Divider />
      <View style={Gutters.smallHMargin}>
        <BankAccountForm
          submitForm={_handleSubmit}
          onSuccess={_formSuccess}
          initialValues={bankAccount}
          containerStyle={Gutters.smallHMargin}
        />
      </View>
    </FormScreenContainer>
  );
};

EditBankAccountScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default EditBankAccountScreen;
