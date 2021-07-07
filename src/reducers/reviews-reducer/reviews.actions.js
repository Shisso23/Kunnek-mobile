import { reviewService } from '../../services';

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
