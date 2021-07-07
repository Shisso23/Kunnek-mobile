import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { FormScreenContainer } from '../../../components';
import Index from '../../../components/atoms/title';
import { BankAccountForm } from '../../../components/forms';
import { successful } from '../../../helpers/errors.helper';
import { useTheme } from '../../../theme';
import {
  deleteUserBankAccountAction,
  editUserBankAccountsAction,
} from '../../../reducers/user-reducer/user-bank-account.actions';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme/Variables';

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

  const _delete = () => {
    dispatch(deleteUserBankAccountAction(_.get(bankAccount, 'id', ''))).then(() =>
      navigation.goBack(),
    );
  };

  const _formSuccess = () => {
    navigation.goBack();
  };

  const { Gutters } = useTheme();

  return (
    <FormScreenContainer>
      <Index title="My Bank Account" />
      <Divider />
      <View style={Gutters.smallHMargin}>
        <BankAccountForm
          submitForm={_handleSubmit}
          onSuccess={_formSuccess}
          initialValues={bankAccount}
          containerStyle={Gutters.smallHMargin}
          submitText="Update Bank Account"
        />
      </View>
      <SafeAreaView>
        <Button
          onPress={_delete}
          title={'Delete'}
          containerStyle={styles.buttonStyle}
          buttonStyle={styles.clearButtonStyle}
          titleStyle={[styles.clearButtonTextStyle]}
        />
      </SafeAreaView>
    </FormScreenContainer>
  );
};

EditBankAccountScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default EditBankAccountScreen;

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
