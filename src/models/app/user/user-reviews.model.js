import _ from 'lodash';

export const userReviewModel = (_apiReviewModel = {}) => ({
  id: _.get(_apiReviewModel, 'id', ''),
  rating: _.get(_apiReviewModel, 'rating', ''),
  comment: _.get(_apiReviewModel, 'text', ''),
  reviewable_id: _.get(_apiReviewModel, 'reviewable_id', ''),
  reviewable_type: _.get(_apiReviewModel, 'reviewable_type', ''),
  rating_options: _.get(_apiReviewModel, 'rating_options', []),
  job: _.get(_apiReviewModel, 'job', {}),
});

export const constructUserReviewModels = (apiReviewModel) =>
  apiReviewModel.map((review) => userReviewModel(review));
