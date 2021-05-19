import dayjs from 'dayjs';
import { getCreditCardNameByNumber } from 'creditcard.js';
import _ from 'lodash';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import appConfig from '../../../config';

export const tokenizeCardModel = (data = {}) => {
  dayjs.extend(customParseFormat);
  const expiryDate = _.get(data, 'expiryDate');

  return {
    entityId: appConfig.peachPayments.pp3dEntityId,
    paymentBrand: getCreditCardNameByNumber(_.get(data, 'cardNumber')).toUpperCase(),
    'card.number': _.get(data, 'cardNumber'),
    'card.holder': encodeURIComponent(_.get(data, 'cardHolder')),
    'card.expiryMonth': dayjs(expiryDate, 'MM/YY').format('MM'),
    'card.expiryYear': dayjs(expiryDate, 'MM/YY').format('YYYY'),
    'card.cvv': _.get(data, 'cvv'),
  };
};
