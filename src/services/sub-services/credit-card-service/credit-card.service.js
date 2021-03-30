import { constructUserCreditCardModels } from '../../../models/app/user/user-credit-card.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import creditCardUrls from './credit-card.urls';

const getCreditCards = async () => {
  const url = creditCardUrls.cardsUrl();
  const apiResponse = await authNetworkService.get(url);
  return constructUserCreditCardModels(apiResponse.data);
};

export default {
  getCreditCards,
};
