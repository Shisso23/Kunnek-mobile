import _ from 'lodash';

export const apiReviewTheDriverModel = (_apiReviewModel = {}) => {
  const data = {
    review: {
      text: _.get(_apiReviewModel, 'comment', ''),
      reviewer_id: _.get(_.get(_apiReviewModel, 'sender', ''), 'userId', ''),
      reviewable_id: _.get(_apiReviewModel, 'id', ''),
      reviewable_type: 'Job',
      rating_options: [
        {
          label: 'On time delivery',
          value: _.get(_apiReviewModel, 'onTimeDelivery'),
        },
        {
          label: 'On time collection',
          value: _.get(_apiReviewModel, 'onTimeCollection'),
        },
        {
          label: 'Condition of item',
          value: _.get(_apiReviewModel, 'conditionOfItem'),
        },
      ],
      user_type: 'sender',
    },
  };
  return data;
};

export const apiReviewTheSenderModel = (_apiReviewModel = {}) => {
  const data = {
    review: {
      text: _.get(_apiReviewModel, 'comment', ''),
      reviewer_id: _.get(_.get(_apiReviewModel, 'deliverer', ''), 'userId', ''),
      reviewable_id: _.get(_apiReviewModel, 'id', ''),
      reviewable_type: 'Job',
      rating_options: [
        {
          label: 'Ease of Pickup',
          value: _.get(_apiReviewModel, 'easeOfPickup'),
        },
        {
          label: 'Accurate description of parcel',
          value: _.get(_apiReviewModel, 'accurateDescriptionOfParcel'),
        },
      ],
      user_type: 'collector',
    },
  };
  return data;
};
