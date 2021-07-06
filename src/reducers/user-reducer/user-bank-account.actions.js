import { bankAccountService, flashService } from '../../services';
import { setBankAccountsLoadingAction, setUserBankAccountsAction } from './user.reducer';

export const getUserBankAccountsAction = () => async (dispatch) => {
  dispatch(setBankAccountsLoadingAction(true));
  try {
    const bankAccounts = await bankAccountService.getBankAccounts();
    dispatch(setUserBankAccountsAction(bankAccounts));
  } catch (error) {
    flashService.error('Could not load bank accounts');
    // eslint-disable-next-line no-console
    console.warn(error.message);
  } finally {
    dispatch(setBankAccountsLoadingAction(false));
  }
};

export const createUserBankAccountsAction = (data = {}) => (dispatch, getState) => {
  dispatch(setBankAccountsLoadingAction(true));

  return bankAccountService
    .createBankAccount(data)
    .then((newBankAccount) => {
      const { bankAccounts } = getState().userReducer;
      return dispatch(setUserBankAccountsAction([...bankAccounts, newBankAccount]));
    })
    .finally(() => dispatch(setBankAccountsLoadingAction(false)));
};
