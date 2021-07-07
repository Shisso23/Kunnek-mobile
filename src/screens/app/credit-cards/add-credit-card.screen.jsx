import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { FormScreenContainer } from '../../../components';
import Index from '../../../components/atoms/title';
import CreditCardForm from '../../../components/forms/credit-card/credit-card.form';
import { successful } from '../../../helpers/errors.helper';
import { userCreditCardModel } from '../../../models/app/user/user-credit-card.model';
import { createUserCreditCardAction } from '../../../reducers/user-reducer/user-cards.actions';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { useTheme } from '../../../theme';

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
        />
      </View>
    </FormScreenContainer>
  );
};

AddCreditCardScreen.propTypes = {};

export default AddCreditCardScreen;
