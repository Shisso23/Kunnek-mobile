import {
  apiReviewTheDriverModel,
  apiReviewTheSenderModel,
} from '../../../models/app/reviews/reviews.model';
import { constructUserReviewModels } from '../../../models/app/user/user-reviews.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import reviewUrls from './review.urls';

const getReviews = async () => {
  const url = reviewUrls.reviewsUrl();
  const apiResponse = await authNetworkService.get(url);
  return constructUserReviewModels(apiResponse.data);
};

const reviewTheDriver = (data = {}) => {
  const url = reviewUrls.reviewsUrl();
  const dataModel = apiReviewTheDriverModel(data);
  return authNetworkService
    .post(url, dataModel)
    .then((response) => response)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const reviewTheSender = (data = {}) => {
  const url = reviewUrls.reviewsUrl();
  const dataModel = apiReviewTheSenderModel(data);
  return authNetworkService
    .post(url, dataModel)
    .then((response) => response)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

export default {
  getReviews,
  reviewTheDriver,
  reviewTheSender,
};
