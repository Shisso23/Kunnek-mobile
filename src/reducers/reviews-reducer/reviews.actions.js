import { reviewService } from '../../services';
import _ from 'lodash';

export const reviewTheDriver = (parcelRequest, formData) => () => {
  const reviewObject = {
    ...parcelRequest,
    ...formData,
  };

  return reviewService.reviewTheDriver(reviewObject);
};

export const reviewTheSender = (parcelRequest, formData) => () => {
  const reviewObject = {
    ...parcelRequest,
    ...formData,
  };

  return reviewService.reviewTheSender(reviewObject);
};

export const getPublicReviewsAction = (user) => () => {
  const id = _.get(user, 'userId', '');
  const user_type = _.get(user, 'type');
  return reviewService.getPublicReviews(id, { user_type }).then((reviews) => reviews);
};
