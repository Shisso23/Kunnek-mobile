import CreateAction from '../action-utilities/action-creator';
import { paymentModel } from '../../models/app/user/payment.model';

const reducerName = 'payment';

const setPayment = CreateAction(reducerName, 'SET_PAYMENT');
export const setPaymentAction = setPayment.action;

const setPaymentsLoading = CreateAction(reducerName, 'SET_PAYMENTS_LOADING');
export const setPaymentsLoadingAction = setPaymentsLoading.action;

const setCheckoutId = CreateAction(reducerName, 'SET_CHECKOUT_ID');
export const setCheckoutIdAction = setCheckoutId.action;

const initialState = {
  payment: paymentModel(),
  paymentsLoading: false,
  checkoutId: undefined,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case setPayment.actionType:
      return {
        ...state,
        payment: action.payload,
      };
    case setPaymentsLoading.actionType:
      return {
        ...state,
        paymentsLoading: action.payload,
      };
    case setCheckoutId.actionType:
      return {
        ...state,
        checkoutId: action.payload,
      };
    default:
      return state;
  }
}
