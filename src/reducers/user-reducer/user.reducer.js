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

const setUserTransactionHistory = CreateAction(reducerName, 'SET_USER_TRANSACTION_HISTORY');
export const setUserTransactionHistoryAction = setUserTransactionHistory.action;

const setTransactionHistoryLoading = CreateAction(reducerName, 'SET_TRANSACTION_HISTORY_LOADING');
export const setTransactionHistoryLoadingAction = setTransactionHistoryLoading.action;

export const userSelector = (reducers) => reducers.userReducer;

const initialState = {
  user: userModel(),
  creditCards: null,
  bankAccounts: null,
  vehicles: null,
  reviews: null,
  transactionHistory: null,

  creditCardsLoading: false,
  bankAccountsLoading: false,
  vehiclesLoading: false,
  transactionHistoryLoading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case setUserTransactionHistory.actionType:
      return {
        ...state,
        transactionHistory: action.payload,
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
    default:
      return state;
  }
}
