import _ from 'lodash';

import { flashService, paymentService } from '../../services';
import {
  setCheckoutIdAction,
  setPaymentAction,
  setPaymentsAction,
  setPaymentsLoadingAction,
} from './payment.reducer';

export const createPaymentAction = (data) => (dispatch) => {
  dispatch(setPaymentsLoadingAction(true));
  return paymentService
    .create(data)
    .then((payment) => {
      dispatch(setPaymentAction(payment));
      return payment;
    })
    .finally(() => {
      dispatch(setPaymentsLoadingAction(false));
    });
};

export const getPayments = (params = {}) => (dispatch) => {
  dispatch(setPaymentsLoadingAction(true));
  return paymentService
    .getPayments(params)
    .then((payments) => {
      dispatch(setPaymentsAction(payments));
      return payments;
    })
    .finally(() => {
      dispatch(setPaymentsLoadingAction(false));
    });
};

export const getTransaction = (id) => (dispatch) => {
  dispatch(setPaymentsLoadingAction(true));
  return paymentService
    .getTransaction(id)
    .then((transaction) => {
      dispatch(setPaymentsAction(transaction));
      return transaction;
    })
    .finally(() => {
      dispatch(setPaymentsLoadingAction(false));
    });
};

export const fetchCheckoutId = (id, data) => (dispatch) => {
  dispatch(setPaymentsLoadingAction(true));
  return paymentService
    .fetchCheckoutId(id, data)
    .then((response) => {
      const checkoutId = _.get(response, 'checkoutId');
      dispatch(setCheckoutIdAction(checkoutId));
      return checkoutId;
    })
    .catch((error) => {
      return flashService.error(error.message);
    })
    .finally(() => {
      dispatch(setPaymentsLoadingAction(false));
    });
};

export const fetchCheckoutStatus = (id) => {
  return (dispatch) => {
    dispatch(setPaymentsLoadingAction(true));
    return paymentService
      .fetchCheckoutStatus(id)
      .then((response) => {
        return _.get(response, 'data', {});
      })
      .catch((error) => flashService.error(error.message))
      .finally(() => {
        dispatch(setPaymentsLoadingAction(false));
      });
  };
};

export const completePayment = (paymentId) => {
  return (dispatch) => {
    dispatch(setPaymentsLoadingAction(true));
    return paymentService
      .completePayment(paymentId)
      .catch((error) => {
        flashService.error(error.message);
      })
      .finally(() => {
        dispatch(setPaymentsLoadingAction(false));
      });
  };
};
