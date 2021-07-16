import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { CreditCardTokenization, FormScreenContainer } from '../../../components';
import Index from '../../../components/atoms/title';
import { useTheme } from '../../../theme';
import { deleteUserCreditCardAction } from '../../../reducers/user-reducer/user-cards.actions';
import CreditCardForm from '../../../components/forms/credit-card/credit-card.form';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme/Variables';

const EditCreditCardScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const creditCardTokenizationRef = useRef(null);
  const { card } = route.params;

  const _onSubmit = async (cardFormValues) => {
    if (creditCardTokenizationRef) {
      return creditCardTokenizationRef.current.process(cardFormValues);
    }
  };

  const _delete = () => {
    dispatch(deleteUserCreditCardAction(_.get(card, 'id', '')));
  };

  const _formSuccess = () => {
    navigation.goBack();
  };

  const { Gutters } = useTheme();

  return (
    <FormScreenContainer>
      <Index title="My Debit/Credit Card" />
      <Divider />
      <View style={Gutters.smallHMargin}>
        <CreditCardForm
          submitForm={_onSubmit}
          onSuccess={_formSuccess}
          initialValues={card}
          containerStyle={Gutters.smallHMargin}
          submitText="Update Card"
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
      <CreditCardTokenization
        ref={creditCardTokenizationRef}
        sceneToNavigateToOnSuccess="TransactionDetails"
        saveMethod="update"
      />
    </FormScreenContainer>
  );
};

EditCreditCardScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default EditCreditCardScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: 'center',
    width: '90%',
  },
  clearButtonStyle: {
    backgroundColor: Colors.transparent,
  },
  clearButtonTextStyle: {
    color: Colors.darkerGrey,
  },
});
