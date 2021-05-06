import _ from 'lodash';

export const userCreditCardModel = (_apiUserModel = {}) => ({
  id: _.get(_apiUserModel, 'id', ''),
  cardNumber: _.get(_apiUserModel, 'obfuscated_card_number', ''),
  cardType: _.get(_apiUserModel, 'card_type', ''),
  tokenizedCard: _.get(_apiUserModel, 'tokenized_card', ''),
  cardHolder: _.get(_apiUserModel, 'card_holder', ''),
  expiryMonth: _.get(_apiUserModel, 'expiry_month', ''),
  expiryYear: _.get(_apiUserModel, 'expiry_year', ''),
  senderId: _.get(_apiUserModel, 'sender_id'),
  default: _.get(_apiUserModel, 'default', false),
  verified: _.get(_apiUserModel, 'verified', false),
  expired: _.get(_apiUserModel, 'expired', false),
});

export const apiUserCreditCardModel = (_appUserModel = {}) => ({
  card: {
    sender_id: _.get(_appUserModel, 'senderId'),
    obfuscated_card_number: _.get(_appUserModel, 'cardNumber', ''),
    card_type: _.get(_appUserModel, 'cardType', ''),
    tokenized_card: _.get(_appUserModel, 'tokenizedCard', ''),
    card_holder: _.get(_appUserModel, 'cardHolder', ''),
    expiry_month: _.get(_appUserModel, 'expiryMonth', ''),
    expiry_year: _.get(_appUserModel, 'expiryYear', ''),
    default: _.get(_appUserModel, 'default', false),
  },
});

export const constructUserCreditCardModels = (apiCreditCardModel) =>
  apiCreditCardModel.map((creditCard) => userCreditCardModel(creditCard));
