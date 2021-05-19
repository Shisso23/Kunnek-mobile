import config from '../../../config';

const apiBaseUrl = config.apiUrl;

export default {
  jobsUrl: () => `${apiBaseUrl}/jobs`,
  parcelRequestsUrl: () => `${apiBaseUrl}/jobs/parcel_requests`,
  deliveriesUrl: () => `${apiBaseUrl}/jobs/deliveries`,
  jobTrackingsUrl: () => `${apiBaseUrl}/jobs/tracking`,
  sendersUrl: () => `${apiBaseUrl}/senders`,
  usersUrl: () => `${apiBaseUrl}/users`,
  collectorsUrl: () => `${apiBaseUrl}/collectors`,
  tripsUrl: () => `${apiBaseUrl}/trips`,
  reviewsUrl: () => `${apiBaseUrl}/reviews`,
  vehicles: () => `${apiBaseUrl}/vehicles`,
  notifications: () => `${apiBaseUrl}/notifications`,
  readNotifications: () => `${apiBaseUrl}/notifications/read`,
  actionsUrl: () => `${apiBaseUrl}/actions`,
  checkInsUrl: () => `${apiBaseUrl}/check_ins`,
  checkInsTrackingUrl: () => `${apiBaseUrl}/check_ins/tracking`,
  bankAccountsUrl: () => `${apiBaseUrl}/bank_accounts`,
  banksUrl: () => `${apiBaseUrl}/banks`,
  queriesUrl: () => `${apiBaseUrl}/queries`,
  paymentsUrl: () => `${apiBaseUrl}/payments`,
  cardsUrl: () => `${apiBaseUrl}/cards`,
};
