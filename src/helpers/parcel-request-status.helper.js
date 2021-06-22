import _ from 'lodash';

export const parcelStatus = Object.freeze({
  //action that sets status to this value
  pending: 1, //job created
  pending_acceptance_from_sender: 2, //driver requests job
  accepted_by_sender: 3, //sender accepts request
  pending_pickup: 4, //driver arrives and initiates pick up
  completed_pickup: 5, //sender confirms pickup
  pending_delivery: 6, //driver initiates delivery (sends OTP)
  completed_delivery: 7, //driver submits OTP
  sender_opted_out: 8, //sender cancelled
  deliverer_opted_out: 9, //driver cancelled
});

export const activeParcelParams = () => {
  const onlyActiveStatusses = _.difference(parcelStatusKeys, [
    'completed_delivery',
    'sender_opted_out',
    'deliverer_opted_out',
  ]);
  return _.join(onlyActiveStatusses, ',');
};

export const abbreviatedStatus = (parcelRequest) => {
  const detailedStatus = _.get(parcelRequest, 'status');
  if (parcelStatus[detailedStatus] < parcelStatus['accepted_by_sender']) {
    return 'not started';
  } else {
    if (parcelStatus[detailedStatus] < parcelStatus['completed_delivery']) return 'in progress';
  }
  return 'completed';
};

export const parcelStatusKeys = Object.keys(parcelStatus);

export const progressPackageStatus = (parcelRequest) => {
  const parcelStatusIndex = parcelStatus[_.get(parcelRequest, 'status')];
  const nextStatus = parcelStatusKeys[parcelStatusIndex];

  return nextStatus;
};

export const cancelJobSender = () => {
  const status = 'sender_opted_out';
  return status;
};

export const cancelJobDeliverer = () => {
  const status = 'deliverer_opted_out';
  return status;
};
