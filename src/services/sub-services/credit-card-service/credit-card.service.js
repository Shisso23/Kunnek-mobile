import {
  apiUserCreditCardModel,
  constructUserCreditCardModels,
  userCreditCardModel
} from '../../../models/app/user/user-credit-card.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import creditCardUrls from './credit-card.urls';
import tripUrls from "../trip-service/trip.urls";
import {apiParcelRequestModel, parcelRequestModel} from "../../../models/app/parcel-request/parcel-request.model";
import networkService from "../network-service/network.service";

const getCreditCards = async () => {
  const url = creditCardUrls.cardsUrl();
  const apiResponse = await authNetworkService.get(url);
  return constructUserCreditCardModels(apiResponse.data);
};

const createCreditCard = async (data) => {
  const url = creditCardUrls.cardsUrl();
  const dataModel = apiUserCreditCardModel(data);
  const _createAndReturnModel = (apiResponse) => userCreditCardModel(apiResponse.data);
  return networkService
    .post(url, dataModel)
    .then(_createAndReturnModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

export default {
  getCreditCards,
  createCreditCard,
};
