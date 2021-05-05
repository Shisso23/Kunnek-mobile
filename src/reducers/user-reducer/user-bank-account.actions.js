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
