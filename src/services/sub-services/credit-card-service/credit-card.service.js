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
import vehicleUrls from '../vehicle-service/vehicle.urls';

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

const deleteCreditCard = (id) => {
  const url = creditCardUrls.cardsUrl();
  return authNetworkService.delete(`${url}/${id}`).catch((error) => {
    // eslint-disable-next-line no-console
    console.warn(error);
    return Promise.reject(error);
  });
};

const updateCreditCard = (id, data = {}) => {
  const url = vehicleUrls.cardsUrl();
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
  deleteCreditCard,
  updateCreditCard,
};
