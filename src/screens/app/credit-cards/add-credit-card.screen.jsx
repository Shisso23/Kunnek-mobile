import React, { useRef } from 'react';
import { Divider } from 'react-native-elements';

import Index from '../../../components/atoms/title';
import { CreditCardTokenization, FormScreenContainer } from '../../../components';
import CreditCardForm from '../../../components/forms/credit-card/credit-card.form';
import { userCreditCardModel } from '../../../models/app/user/user-credit-card.model';

const AddCreditCardScreen = () => {
  const creditCardTokenizationRef = useRef(null);

  const _onSubmit = async (cardFormValues) => {
    if (creditCardTokenizationRef) {
      return creditCardTokenizationRef.current.process(cardFormValues);
    }
  };

  return (
    <>
      <FormScreenContainer contentContainerStyle={styles.formContainer}>
        <Index title="My Debit/Credit Card" />
        <Divider />
        <CreditCardForm
          initialValues={userCreditCardModel({})}
          submitForm={_onSubmit}
          submitButtonStyle={styles.submitButtonStyle}
        />
      </FormScreenContainer>
      <CreditCardTokenization
        ref={creditCardTokenizationRef}
        sceneToNavigateToOnSuccess="TransactionDetails"
        saveMethod="create"
      />
    </>
  );
};

export default AddCreditCardScreen;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  submitButtonStyle: {
    alignSelf: 'center',
    bottom: 0,
    position: 'absolute',
    width: '95%',
  },
});
