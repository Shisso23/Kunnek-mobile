import {
  apiUserCreditCardModel,
  constructUserCreditCardModels,
  userCreditCardModel,
} from '../../../models/app/user/user-credit-card.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import creditCardUrls from './credit-card.urls';
import paymentUrls from '../payment-service/payment.urls';
import appConfig from '../../../config';
import { networkService } from '../../index';

const getCreditCards = async () => {
  const url = creditCardUrls.cardsUrl();
  const apiResponse = await authNetworkService.get(url);
  return constructUserCreditCardModels(apiResponse.data);
};

const createCreditCard = async (data) => {
  const url = creditCardUrls.cardsUrl();
  const dataModel = apiUserCreditCardModel(data);
  const _createAndReturnModel = (apiResponse) => userCreditCardModel(apiResponse.data);
  return authNetworkService
    .post(url, dataModel)
    .then(_createAndReturnModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const tokenizeCard = (data) =>
  networkService.post(
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

export default {
  getCreditCards,
  createCreditCard,
  tokenizeCard,
};