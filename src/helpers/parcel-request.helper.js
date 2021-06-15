import _ from 'lodash';
import { formatDate } from './date.helper';
import { parcelStatus } from './parce-request-status.helper';

export const parcelStatusSender = (parcelRequest) => {
  let parcelDetailsMessages = {
    status: {},
    pickUp: {},
    delivery: {},
    review: {},
  };

  const parcelStatusNumber = parcelStatus[_.get(parcelRequest, 'status')];

  parcelDetailsMessages.status.description = _.get(parcelRequest, 'description');
  parcelDetailsMessages.status.date = formatDate(_.get(parcelRequest, 'latestDeliveryDateTime'));
  parcelDetailsMessages.pickUp.title = 'Pick-Up';
  parcelDetailsMessages.delivery.title = 'Delivery';
  parcelDetailsMessages.review.title = 'Review';

  if (parcelStatusNumber >= 1 && parcelStatusNumber < 6)
    parcelDetailsMessages.status.icon = 'active';

  if (parcelStatusNumber >= 6 && parcelStatusNumber < 8)
    parcelDetailsMessages.pickUp.icon = 'active';

  if (parcelStatusNumber >= 8 && parcelStatusNumber < 10)
    parcelDetailsMessages.delivery.icon = 'active';

  if (parcelStatusNumber >= 10) parcelDetailsMessages.review.icon = 'active';

  if (parcelStatusNumber === 1) {
    parcelDetailsMessages.status.title = 'Looking for Driver';
    parcelDetailsMessages.status.interaction = 'View Parcel';
  }

  if (parcelStatusNumber === 2) {
    parcelDetailsMessages.status.title = 'Pending Acceptance';
    parcelDetailsMessages.status.interaction = 'Accept/Decline Driver';
  }

  if (parcelStatusNumber > 2) {
    parcelDetailsMessages.status.title = 'Driver accepted by sender';
  }

  if (parcelStatusNumber === 6) {
    parcelDetailsMessages.pickUp.title = 'Pending Pick-up';
    parcelDetailsMessages.pickUp.description = 'Driver is on route';
  }

  if (parcelStatusNumber === 7) {
    parcelDetailsMessages.pickUp.title = 'Pick-up';
    parcelDetailsMessages.pickUp.description = 'Confirm Parcel Picked Up';
    parcelDetailsMessages.pickUp.interaction = 'Confirm Pick-up';
  }

  if (parcelStatusNumber > 7) {
    parcelDetailsMessages.pickUp.title = 'Pick-up Completed';
    parcelDetailsMessages.pickUp.description = 'Driver has collected the parcel';
  }

  if (parcelStatusNumber === 8) {
    parcelDetailsMessages.delivery.title = 'Pending Delivery';
    parcelDetailsMessages.delivery.description = 'Driver is on route with the parcel';
  }

  if (parcelStatusNumber === 9) {
    parcelDetailsMessages.delivery.title = 'Initiated Delivery';
    parcelDetailsMessages.delivery.description =
      'Driver is at the delivery location and waiting for receivers OTP';
  }

  if (parcelStatusNumber > 9) {
    parcelDetailsMessages.delivery.title = 'Delivery Completed';
    parcelDetailsMessages.delivery.description = 'Parcel Delivered';
  }
  if (parcelStatusNumber === 10) {
    parcelDetailsMessages.review.title = 'Review';
    parcelDetailsMessages.review.description = 'Review Driver';
    parcelDetailsMessages.review.interaction = 'Review';
  }

  return parcelDetailsMessages;
};

export const parcelStatusDeliverer = (parcelRequest) => {
  let parcelDetailsMessages = {
    status: {},
    pickUp: {},
    delivery: {},
    review: {},
  };

  const parcelStatusNumber = parcelStatus[_.get(parcelRequest, 'status')];

  parcelDetailsMessages.status.description = _.get(parcelRequest, 'description');
  parcelDetailsMessages.status.date = formatDate(_.get(parcelRequest, 'latestDeliveryDateTime'));
  parcelDetailsMessages.pickUp.title = 'Pick-Up';
  parcelDetailsMessages.delivery.title = 'Delivery';
  parcelDetailsMessages.review.title = 'Review';

  if (parcelStatusNumber >= 1 && parcelStatusNumber < 6)
    parcelDetailsMessages.status.icon = 'active';

  if (parcelStatusNumber >= 6 && parcelStatusNumber < 8)
    parcelDetailsMessages.pickUp.icon = 'active';

  if (parcelStatusNumber >= 8 && parcelStatusNumber < 10)
    parcelDetailsMessages.delivery.icon = 'active';

  if (parcelStatusNumber >= 10) parcelDetailsMessages.review.icon = 'active';

  if (parcelStatusNumber === 1) {
    parcelDetailsMessages.status.title = 'Looking for Driver';
    parcelDetailsMessages.status.interaction = 'View Parcel';
  }

  if (parcelStatusNumber === 2) {
    parcelDetailsMessages.status.title = 'Pending Acceptance';
    parcelDetailsMessages.status.description = 'Request has been sent to sender to accept';
  }

  if (parcelStatusNumber > 2) {
    parcelDetailsMessages.status.title = 'Driver accepted by sender';
  }

  if (parcelStatusNumber === 5) {
    parcelDetailsMessages.pickUp.title = 'Pick-up';
    parcelDetailsMessages.pickUp.description =
      'Initiate pickup when you arrive at the pickup location and are ready to receive the parcel';
    parcelDetailsMessages.pickUp.interaction = 'Initiate Pick-up';
  }

  if (parcelStatusNumber > 7) {
    parcelDetailsMessages.pickUp.title = 'Pick-up';
    parcelDetailsMessages.pickUp.description = 'Pick-up Completed';
  }

  if (parcelStatusNumber === 8) {
    parcelDetailsMessages.delivery.title = 'Pending';
    parcelDetailsMessages.delivery.description =
      'Once you have arrived at the delivery location initiate delivery to receive the OTP pin for payment';
    parcelDetailsMessages.delivery.interaction = 'Initiate Delivery';
  }

  if (parcelStatusNumber > 9) {
    parcelDetailsMessages.delivery.title = 'Delivery Completed';
    parcelDetailsMessages.delivery.description = 'Parcel Delivered';
  }
  if (parcelStatusNumber === 10) {
    parcelDetailsMessages.review.title = 'Review';
    parcelDetailsMessages.review.description = 'Review Driver';
    parcelDetailsMessages.review.interaction = 'Review';
  }

  return parcelDetailsMessages;
};
