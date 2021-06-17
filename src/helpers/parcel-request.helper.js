import _ from 'lodash';

import { formatDate } from './date.helper';
import { parcelStatus } from './parcel-request-status.helper';

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

  if (
    parcelStatusNumber >= parcelStatus['pending'] &&
    parcelStatusNumber < parcelStatus['accepted_by_sender']
  )
    parcelDetailsMessages.status.icon = 'active';

  if (
    parcelStatusNumber >= parcelStatus['accepted_by_sender'] &&
    parcelStatusNumber < parcelStatus['completed_pickup']
  )
    parcelDetailsMessages.pickUp.icon = 'active';

  if (
    parcelStatusNumber >= parcelStatus['completed_pickup'] &&
    parcelStatusNumber < parcelStatus['completed_delivery']
  )
    parcelDetailsMessages.delivery.icon = 'active';

  if (parcelStatusNumber >= parcelStatus['completed_delivery'])
    parcelDetailsMessages.review.icon = 'active';

  if (parcelStatusNumber === parcelStatus['pending']) {
    parcelDetailsMessages.status.title = 'Looking for Driver';
    parcelDetailsMessages.status.interaction = 'View Parcel';
    parcelDetailsMessages.status.action = 'ViewParcel';
  }

  if (parcelStatusNumber === parcelStatus['pending_acceptance_from_sender']) {
    parcelDetailsMessages.status.title = 'Pending Acceptance';
    parcelDetailsMessages.status.interaction = 'Accept/Decline Driver';
    parcelDetailsMessages.status.action = 'DriverReview';
  }

  if (parcelStatusNumber === parcelStatus['accepted_by_sender']) {
    parcelDetailsMessages.status.title = 'Driver accepted by sender';
  }

  if (parcelStatusNumber > parcelStatus['accepted_by_sender']) {
    parcelDetailsMessages.status.title = 'Accepted';
  }

  if (parcelStatusNumber === parcelStatus['accepted_by_sender']) {
    parcelDetailsMessages.pickUp.title = 'Pending Pick-up';
    parcelDetailsMessages.pickUp.description = 'Driver is on route';
  }

  if (parcelStatusNumber === parcelStatus['pending_pickup']) {
    parcelDetailsMessages.pickUp.title = 'Pick-up';
    parcelDetailsMessages.pickUp.description = 'Confirm Parcel Picked Up';
    parcelDetailsMessages.pickUp.interaction = 'Confirm Pick-up';
  }

  if (parcelStatusNumber > parcelStatus['pending_pickup']) {
    parcelDetailsMessages.pickUp.title = 'Pick-up Completed';
    parcelDetailsMessages.status.date = formatDate(_.get(parcelRequest, 'pickupDateTime'));
    parcelDetailsMessages.pickUp.description = 'Driver has collected the parcel';
  }

  if (parcelStatusNumber === parcelStatus['completed_pickup']) {
    parcelDetailsMessages.delivery.title = 'Pending Delivery';
    parcelDetailsMessages.delivery.description = 'Driver is on route with the parcel';
  }

  if (parcelStatusNumber === parcelStatus['pending_delivery']) {
    parcelDetailsMessages.delivery.title = 'Pending Delivery';
    parcelDetailsMessages.delivery.description =
      "Driver is at the delivery location and waiting for receiver's OTP";
  }

  if (parcelStatusNumber === parcelStatus['initiated_delivery']) {
    parcelDetailsMessages.delivery.title = 'Initiated Delivery';
    parcelDetailsMessages.delivery.description =
      'Driver is at the delivery location and waiting for receivers OTP';
  }

  if (parcelStatusNumber === parcelStatus['completed_delivery']) {
    parcelDetailsMessages.delivery.title = 'Delivery Completed';
    parcelDetailsMessages.delivery.description = 'Parcel Delivered';
  }
  if (parcelStatusNumber === parcelStatus['completed_delivery']) {
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

  if (
    parcelStatusNumber >= parcelStatus['pending'] &&
    parcelStatusNumber < parcelStatus['accepted_by_sender']
  )
    parcelDetailsMessages.status.icon = 'active';

  if (
    parcelStatusNumber >= parcelStatus['accepted_by_sender'] &&
    parcelStatusNumber < parcelStatus['completed_pickup']
  )
    parcelDetailsMessages.pickUp.icon = 'active';

  if (
    parcelStatusNumber >= parcelStatus['completed_pickup'] &&
    parcelStatusNumber < parcelStatus['completed_delivery']
  )
    parcelDetailsMessages.delivery.icon = 'active';

  if (parcelStatusNumber >= parcelStatus['completed_delivery'])
    parcelDetailsMessages.review.icon = 'active';

  if (parcelStatusNumber === parcelStatus['pending_acceptance_from_sender']) {
    parcelDetailsMessages.status.title = 'Pending Acceptance';
    parcelDetailsMessages.status.description = 'Request has been sent to sender to accept';
    parcelDetailsMessages.status.interaction = 'Cancel Request';
  }

  if (parcelStatusNumber > parcelStatus['pending_acceptance_from_sender']) {
    parcelDetailsMessages.status.title = 'Accepted';
  }

  if (parcelStatusNumber === parcelStatus['accepted_by_sender']) {
    parcelDetailsMessages.pickUp.title = 'Pick-up';
    parcelDetailsMessages.pickUp.description =
      'Initiate pickup when you arrive at the pickup location and are ready to receive the parcel';
    parcelDetailsMessages.pickUp.interaction = 'Initiate Pick-up';
  }

  if (parcelStatusNumber > parcelStatus['accepted_by_sender']) {
    parcelDetailsMessages.pickUp.title = 'Pick-up';
    parcelDetailsMessages.pickUp.description = 'Pick-up Completed';
  }

  if (parcelStatusNumber >= parcelStatus['completed_pickup']) {
    parcelDetailsMessages.delivery.title = 'Pending';
    parcelDetailsMessages.delivery.description =
      'Once you have arrived at the delivery location initiate delivery to receive the OTP pin for payment';
    parcelDetailsMessages.delivery.interaction = 'Initiate Delivery';
  }

  if (parcelStatusNumber === parcelStatus['initiated_delivery']) {
    parcelDetailsMessages.delivery.title = 'Delivery Initiated';
    parcelDetailsMessages.delivery.description =
        'Once you have arrived at the delivery location initiate delivery to receive the OTP pin for payment';
    parcelDetailsMessages.delivery.interaction = 'Enter OTP';
  }

  if (parcelStatusNumber > parcelStatus['initiated_delivery']) {
    parcelDetailsMessages.delivery.title = 'Delivery Completed';
    parcelDetailsMessages.delivery.description = 'Parcel Delivered';
    parcelDetailsMessages.delivery.interaction = null;
  }
  if (parcelStatusNumber >= parcelStatus['completed_delivery']) {
    parcelDetailsMessages.review.title = 'Review';
    parcelDetailsMessages.review.description = 'Review Driver';
    parcelDetailsMessages.review.interaction = 'Review';
  }

  return parcelDetailsMessages;
};
