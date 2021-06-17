import _ from 'lodash';

export const parcelStatus = Object.freeze({
  //action that sets status to this value
  pending: 1, //job created
  pending_acceptance_from_sender: 2, //driver requests job
  accepted_by_sender: 3, //sender accepts request
  pending_pickup: 4, //driver arrives and initiates pick up
  completed_pickup: 5, //sender confirms pickup
  pending_delivery: 6, //driver initiates delivery (sends OTP)
  initiated_delivery: 7, //delivery has been initiated but the OTP is required
  completed_delivery: 8, //driver submits OTP
  sender_opted_out: 9, //sender cancelled
  deliverer_opted_out: 10, //driver cancelled
});

export const parcelStatusKeys = Object.keys(parcelStatus);

export const progressPackageStatus = (parcelRequest) => {
  const parcelStatusIndex = parcelStatus[_.get(parcelRequest, 'status')];
  return parcelStatusKeys[parcelStatusIndex];
};

export const cancelJobSender = () => {
  return 'sender_opted_out';
};

export const cancelJobDeliverer = () => {
  return 'deliverer_opted_out';
};
