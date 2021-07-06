import _ from 'lodash';
import { userModel } from './user.model';

export const userReviewModel = (_apiReviewModel = {}) => ({
  id: _.get(_apiReviewModel, 'id', ''),
  rating: _.get(_apiReviewModel, 'rating', ''),
  comment: _.get(_apiReviewModel, 'text', ''),
  reviewableId: _.get(_apiReviewModel, 'reviewable_id', ''),
  reviewableType: _.get(_apiReviewModel, 'reviewable_type', ''),
  ratingOptions: _.get(_apiReviewModel, 'rating_options', []),
  job: _.get(_apiReviewModel, 'job', {}),
  reviewer: userModel(_.get(_apiReviewModel, 'reviewer', {})),
});

export const constructUserReviewModels = (apiReviewModel) =>
  apiReviewModel.map((review) => userReviewModel(review));
