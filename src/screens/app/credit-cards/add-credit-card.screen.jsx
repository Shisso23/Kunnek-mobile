import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { FormScreenContainer } from '../../../components';
import Index from '../../../components/atoms/title';
import CreditCardForm from '../../../components/forms/credit-card/credit-card.form';
import { successful } from '../../../helpers/errors.helper';
import { userCreditCardModel } from '../../../models/app/user/user-credit-card.model';
import { createUserCreditCardAction } from '../../../reducers/user-reducer/user-cards.actions';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/Variables';

const AddCreditCardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const _handleSubmit = (currentForm) => {
    return dispatch(createUserCreditCardAction(currentForm))
      .then((cardResponse) => {
        if (successful(cardResponse)) {
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

  const { Gutters } = useTheme();
  const { senderId } = useSelector(userSelector);

  return (
    <FormScreenContainer>
      <Index title="Add Credit Card" />
      <Divider />
      <View style={Gutters.smallHMargin}>
        <CreditCardForm
          submitForm={_handleSubmit}
          onSuccess={_formSuccess}
          initialValues={userCreditCardModel({ sender_id: senderId })}
          containerStyle={Gutters.smallHMargin}
          submitText="Add Credit Card"
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

AddCreditCardScreen.propTypes = {};

export default AddCreditCardScreen;

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
