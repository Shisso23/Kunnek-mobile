import CreateAction from '../action-utilities/action-creator';
import { userModel } from '../../models';

const reducerName = 'user';

const setUser = CreateAction(reducerName, 'SET_USER');
export const setUserAction = setUser.action;
export const setUserActionType = setUser.actionType;

const setUserCreditCards = CreateAction(reducerName, 'SET_USER_CREDIT_CARDS');
export const setUserCreditCardsAction = setUserCreditCards.action;

const setCreditCardsLoading = CreateAction(reducerName, 'SET_CREDIT_CARDS_LOADING');
export const setCreditCardsLoadingAction = setCreditCardsLoading.action;

const setUserBankAccounts = CreateAction(reducerName, 'SET_USER_BANK_ACCOUNTS');
export const setUserBankAccountsAction = setUserBankAccounts.action;

const setBankAccountsLoading = CreateAction(reducerName, 'SET_BANK_ACCOUNTS_LOADING');
export const setBankAccountsLoadingAction = setBankAccountsLoading.action;

const setUserVehicles = CreateAction(reducerName, 'SET_USER_VEHICLES');
export const setUserVehiclesAction = setUserVehicles.action;

const setVehiclesLoading = CreateAction(reducerName, 'SET_VEHICLES_LOADING');
export const setVehiclesLoadingAction = setVehiclesLoading.action;

const setUserReviews = CreateAction(reducerName, 'SET_USER_REVIEWS');
export const setUserReviewsAction = setUserReviews.action;

const setReviewsLoading = CreateAction(reducerName, 'SET_REVIEWS_LOADING');
export const setReviewsLoadingAction = setReviewsLoading.action;

const setUserTransactionHistory = CreateAction(reducerName, 'SET_USER_TRANSACTION_HISTORY');
export const setUserTransactionHistoryAction = setUserTransactionHistory.action;

const setTransactionHistoryLoading = CreateAction(reducerName, 'SET_TRANSACTION_HISTORY_LOADING');
export const setTransactionHistoryLoadingAction = setTransactionHistoryLoading.action;

const setUserNotificationHistory = CreateAction(reducerName, 'SET_USER_NOTIFICATION_HISTORY');
export const setUserNotificationHistoryAction = setUserNotificationHistory.action;

const setNotificationHistoryLoading = CreateAction(reducerName, 'SET_NOTIFICATION_HISTORY_LOADING');
export const setNotificationHistoryLoadingAction = setNotificationHistoryLoading.action;

const setUserDelivererId = CreateAction(reducerName, 'SET_USER_DELIVERER_ID');
export const setUserDelivererIdAction = setUserDelivererId.action;

const setUserSenderId = CreateAction(reducerName, 'SET_USER_SENDER_ID');
export const setUserSenderIdAction = setUserSenderId.action;

const setSubmitCardTransactionLoading = CreateAction(
  reducerName,
  'SET_SUBMIT_CARD_TRANSACTION_LOADING',
);
export const setSubmitCardTransactionLoadingAction = setSubmitCardTransactionLoading.action;

const setCardCheckoutId = CreateAction(reducerName, 'SET_CARD_CHECKOUT_ID');
export const setCardCheckoutIdAction = setCardCheckoutId.action;

export const userSelector = (reducers) => reducers.userReducer;

const initialState = {
  user: userModel(),
  creditCards: [],
  bankAccounts: [],
  vehicles: [],
  reviews: [],
  transactionHistory: [],
  notificationHistory: [],
  delivererId: null,
  senderId: null,
  cardCheckoutID: null,

  creditCardsLoading: false,
  bankAccountsLoading: false,
  vehiclesLoading: false,
  transactionHistoryLoading: false,
  notificationHistoryLoading: false,
  submitCardTransactionLoading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case setUserTransactionHistory.actionType:
      return {
        ...state,
        transactionHistory: action.payload,
      };
    case setUserNotificationHistory.actionType:
      return {
        ...state,
        notificationHistory: action.payload,
      };
    case setUserSenderId.actionType:
      return {
        ...state,
        senderId: action.payload,
      };
    case setUserDelivererId.actionType:
      return {
        ...state,
        delivererId: action.payload,
      };
    case setUser.actionType:
      return {
        ...state,
        user: action.payload,
      };
    case setVehiclesLoading.actionType:
      return {
        ...state,
        vehiclesLoading: action.payload,
      };

    case setBankAccountsLoading.actionType:
      return {
        ...state,
        bankAccountsLoading: action.payload,
      };
    case setUserCreditCards.actionType:
      return {
        ...state,
        creditCards: action.payload,
      };
    case setUserBankAccounts.actionType:
      return {
        ...state,
        bankAccounts: action.payload,
      };

    case setTransactionHistoryLoading.actionType:
      return {
        ...state,
        transactionHistoryLoading: action.payload,
      };
    case setNotificationHistoryLoading.actionType:
      return {
        ...state,
        notificationHistoryLoading: action.payload,
      };
    case setUserVehicles.actionType:
      return {
        ...state,
        vehicles: action.payload,
      };

    case setUserReviews.actionType:
      return {
        ...state,
        reviews: action.payload,
      };
    case setCreditCardsLoading.actionType:
      return {
        ...state,
        creditCardsLoading: action.payload,
      };
    case setSubmitCardTransactionLoading.actionType:
      return {
        ...state,
        submitCardTransactionLoading: action.payload,
      };
    case setCardCheckoutId.actionType:
      return {
        ...state,
        cardCheckoutID: action.payload,
      };
    default:
      return state;
  }
}
