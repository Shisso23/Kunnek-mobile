import { flashService, paymentService } from '../../services';
import {
  setTransactionHistoryLoadingAction,
  setUserTransactionHistoryAction,
} from './user.reducer';
import { paymentModel } from '../../models/app/user/payment.model';

export const getUserTransactionHistoryAction = () => async (dispatch) => {
  dispatch(setTransactionHistoryLoadingAction(true));
  try {
    const transactions = await paymentService.getTransactions();
    dispatch(setUserTransactionHistoryAction(transactions));
  } catch (error) {
    flashService.error('Could not load transactions');
    // eslint-disable-next-line no-console
    console.warn(error.message);
  } finally {
    dispatch(setTransactionHistoryLoadingAction(false));
  }
};

export const getUserTransaction = (paymentId) => (dispatch) => {
  dispatch(setTransactionHistoryLoadingAction(true));
  return paymentService
    .getTransaction(paymentId)
    .then((transaction) => {
      return paymentModel(transaction);
    })
    .catch((error) => {
      console.warn(error.message);
      flashService.error('Could not load transaction');
    })
    .finally(() => {
      dispatch(setTransactionHistoryLoadingAction(false));
    });
};
