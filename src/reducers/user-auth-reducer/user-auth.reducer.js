import CreateAction from '../action-utilities/action-creator';
import { AuthStates } from './user-auth.enums';

const reducerName = 'user-auth';

const setAuthState = CreateAction(reducerName, 'SET_AUTH_STATE');
export const setAuthStateAction = setAuthState.action;

const setDoneLoadingAppData = CreateAction(reducerName, 'SET_DONE_LOADING_APP_DATA');
export const setDoneLoadingAppDataAction = setDoneLoadingAppData.action;

const initialState = {
  doneLoadingAppData: false,
  authState: AuthStates.NO_TOKEN,
};

export const userAuthSelector = (reducers) => reducers.userAuthReducer;

export const isAuthenticatedSelector = (reducers) => {
  const { AUTHENTICATED } = AuthStates;
  const { authState, doneLoadingAppData } = reducers.userAuthReducer;
  const isAuthenticated = doneLoadingAppData && authState === AUTHENTICATED;
  return isAuthenticated;
};

export default function userAuthReducer(state = initialState, action) {
  switch (action.type) {
    case setAuthState.actionType:
      return {
        ...state,
        authState: action.payload,
      };
    case setDoneLoadingAppData.actionType:
      return {
        ...state,
        doneLoadingAppData: action.payload,
      };
    default:
      return state;
  }
}
