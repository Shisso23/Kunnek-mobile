import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { FormScreenContainer } from '../../../components';
import Index from '../../../components/atoms/title';
import { successful } from '../../../helpers/errors.helper';
import { useTheme } from '../../../theme';
import { editCreditCardAction } from '../../../reducers/user-reducer/user-cards.actions';
import CreditCardForm from '../../../components/forms/credit-card/credit-card.form';

const EditCreditCardScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { card } = route.params;

  const _handleSubmit = (currentForm) => {
    return dispatch(editCreditCardAction(currentForm))
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

  return (
    <FormScreenContainer>
      <Index title="Edit Credit Card" />
      <Divider />
      <View style={[Gutters.smallHMargin]}>
        <CreditCardForm
          submitForm={_handleSubmit}
          onSuccess={_formSuccess}
          initialValues={card}
          containerStyle={[Gutters.smallHMargin]}
        />
      </View>
    </FormScreenContainer>
  );
};

EditCreditCardScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default EditCreditCardScreen;
