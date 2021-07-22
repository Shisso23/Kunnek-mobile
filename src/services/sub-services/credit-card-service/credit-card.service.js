import _ from 'lodash';

import {
  apiUserCreditCardModel,
  constructUserCreditCardModels,
  userCreditCardModel,
} from '../../../models/app/user/user-credit-card.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import creditCardUrls from './credit-card.urls';
import paymentUrls from '../payment-service/payment.urls';
import appConfig from '../../../config';
import networkService from '../network-service/network.service';

const getCreditCards = async () => {
  const url = creditCardUrls.cardsUrl();
  const apiResponse = await authNetworkService.get(url);
  return constructUserCreditCardModels(apiResponse.data);
};

const createCheckoutId = async () =>
  authNetworkService
    .post(creditCardUrls.createCheckoutUrl())
    .then((response) => _.get(response, 'data'));

const getCardRegistrationStatus = async (checkoutID) => {
  const url = creditCardUrls.cardsUrl();
  const apiResponse = await authNetworkService.get(
    `${url}/registration_status?checkout_id=${checkoutID}`,
  );
  return apiResponse.data;
};

const createCreditCard = async (data) => {
  const url = creditCardUrls.cardsUrl();
  const dataModel = apiUserCreditCardModel(data);
  const _createAndReturnModel = (apiResponse) => userCreditCardModel(apiResponse.data);
  return authNetworkService
    .post(url, dataModel)
    .then((response) => {
      return _createAndReturnModel(response);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const tokenizeCard = (data) => {
  return networkService.post(
    paymentUrls.registration(),
    data,
    {
      headers: {
        Authorization: `Bearer ${appConfig.peachPayments.ppAuthBearer}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
    false,
  );
};

const deleteCreditCard = (id) => {
  const url = creditCardUrls.cardsUrl();
  return authNetworkService.delete(`${url}/${id}`).catch((error) => {
    // eslint-disable-next-line no-console
    console.warn(error);
    return Promise.reject(error);
  });
};

const updateCreditCard = (id, data = {}) => {
  const url = creditCardUrls.cardsUrl();
  const dataModel = apiUserCreditCardModel(data);
  return authNetworkService
    .patch(`${url}/${id}`, dataModel)
    .then((response) => {
      return userCreditCardModel(response.data);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

export default {
  getCreditCards,
  createCreditCard,
  tokenizeCard,
  getCardRegistrationStatus,
  createCheckoutId,
  deleteCreditCard,
  updateCreditCard,
};
