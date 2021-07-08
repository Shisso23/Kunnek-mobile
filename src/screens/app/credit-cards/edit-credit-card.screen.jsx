import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { FormScreenContainer } from '../../../components';
import Index from '../../../components/atoms/title';
import { successful } from '../../../helpers/errors.helper';
import { useTheme } from '../../../theme';
import {
  deleteUserCreditCardAction,
  editCreditCardAction,
} from '../../../reducers/user-reducer/user-cards.actions';
import CreditCardForm from '../../../components/forms/credit-card/credit-card.form';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme/Variables';

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
          submitForm={_handleSubmit}
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
    </FormScreenContainer>
  );
};

EditCreditCardScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default EditCreditCardScreen;

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
