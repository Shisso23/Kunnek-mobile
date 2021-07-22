import _ from 'lodash';
import { updateObjectArray } from '../../helpers/data.helper';
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

export const deleteUserBankAccountAction = (id) => (dispatch, getState) => {
  dispatch(setBankAccountsLoadingAction(true));
  return bankAccountService
    .deleteBankAccount(id)
    .then(() => {
      const { bankAccounts } = getState().userReducer;

      _.remove(bankAccounts, (account) => {
        return _.get(account, 'id') === id;
      });
      return dispatch(setUserBankAccountsAction(bankAccounts));
    })
    .finally(() => {
      dispatch(setBankAccountsLoadingAction(false));
    });
};

export const editUserBankAccountsAction = (data = {}) => (dispatch, getState) => {
  dispatch(setBankAccountsLoadingAction(true));
  const id = _.get(data, 'id');

  return bankAccountService
    .updateBankAccount(id, data)
    .then((changedBankAccount) => {
      const { bankAccounts } = getState().userReducer;

      return dispatch(
        setUserBankAccountsAction(updateObjectArray(bankAccounts, changedBankAccount)),
      );
    })
    .finally(() => {
      dispatch(setBankAccountsLoadingAction(false));
    });
};

export const setDefaultBankAccountAction = (id) => (dispatch) => {
  dispatch(setBankAccountsLoadingAction(true));

  return bankAccountService
    .setBankAccountDefault(id)
    .then((changedBankAccount) => {
      flashService.success('Bank account successfully set to default.');
      return changedBankAccount;
    })
    .finally(() => {
      dispatch(setBankAccountsLoadingAction(false));
    });
};
