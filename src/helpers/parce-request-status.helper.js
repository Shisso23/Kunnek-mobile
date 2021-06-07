export const parcelStatus = Object.freeze({
  pending: 1,
  pending_acceptance_from_sender: 2,
  pending_acceptance_from_deliverer: 3,
  accepted_by_deliverer: 4,
  accepted_by_sender: 5,
  pending_pickup: 6,
  completed_pickup: 7,
  pending_delivery: 8,
  initiated_delivery: 9,
  completed_delivery: 10,
  sender_opted_out: 11,
  deliverer_opted_out: 12,
});
