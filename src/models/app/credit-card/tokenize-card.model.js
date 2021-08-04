import dayjs from 'dayjs';
import { getCreditCardNameByNumber } from 'creditcard.js';
import _ from 'lodash';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import config from '../../../config';

export const tokenizeCardModel = (data = {}) => {
  dayjs.extend(customParseFormat);
  const expiryDate = _.get(data, 'expiryDate');

  return {
    entityId: _.get(config.peachPayments, 'pp3dEntityId', ''),
    paymentBrand: getCreditCardNameByNumber(_.get(data, 'cardNumber')).toUpperCase(),
    cardNumber: _.get(data, 'cardNumber'),
    obfuscatedCardNumber: `************${_.get(data, 'cardNumber').slice(
      _.get(data, 'cardNumber').length - 4,
    )}`,
    cardHolder: _.get(data, 'cardHolder'),
    expiryMonth: dayjs(expiryDate, 'MM/YY').format('MM'),
    expiryYear: dayjs(expiryDate, 'MM/YY').format('YYYY'),
    cvv: _.get(data, 'cvv'),
  };
};
