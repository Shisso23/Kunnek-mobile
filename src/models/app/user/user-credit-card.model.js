import _ from 'lodash';

export const userCreditCardModel = (_apiUserModel = {}) => ({
  id: _.get(_apiUserModel, 'id', ''),
  cardNumber: _.get(_apiUserModel, 'obfuscated_card_number', ''),
  cardType: _.get(_apiUserModel, 'card_type', ''),
  tokenizedCard: _.get(_apiUserModel, 'tokenized_card', ''),
  cardHolder: _.get(_apiUserModel, 'card_holder', ''),
  expiryMonth: _.get(_apiUserModel, 'expiry_month', ''),
  expiryYear: _.get(_apiUserModel, 'expiry_year', ''),
  default: _.get(_apiUserModel, 'default', false),
  verified: _.get(_apiUserModel, 'verified', false),
  expired: _.get(_apiUserModel, 'expired', true),
});

export const apiUserCreditCardModel = (_appUserModel = {}) => ({
  user: {
    email: _.get(_appUserModel, 'email', ''),
    name: _.get(_appUserModel, 'name', ''),
  },
});

export const constructUserCreditCardModels = (apiCreditCardModel) =>
  apiCreditCardModel.map((creditCard) => userCreditCardModel(creditCard));
