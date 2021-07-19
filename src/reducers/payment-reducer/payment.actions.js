import _ from 'lodash';

import { flashService, paymentService } from '../../services';
import { setCheckoutIdAction, setPaymentAction, setPaymentsLoadingAction } from './payment.reducer';

export const createPaymentAction = (data) => async (dispatch) => {
  dispatch(setPaymentsLoadingAction(true));
  return paymentService
    .create(data)
    .then((payment) => {
      return dispatch(setPaymentAction(payment));
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
