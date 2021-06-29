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
      const checkoutId = _.get(response, 'checkout_id');
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
