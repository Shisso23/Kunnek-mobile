import { constructUserReviewModels } from '../../../models/app/user/user-reviews.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import reviewUrls from './review.urls';

const getReviews = async () => {
  const url = reviewUrls.reviewsUrl();
  const apiResponse = await authNetworkService.get(url);
  return constructUserReviewModels(apiResponse.data);
};

export default {
  getReviews,
};
