import CreateAction from '../action-utilities/action-creator';

const reducerName = 'app';

const setBanks = CreateAction(reducerName, 'SET_BANKS');
export const setBanksAction = setBanks.action;

export const appSelector = (reducers) => reducers.appReducer;

const initialState = {
  banks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case setBanks.actionType:
      return {
        ...state,
        banks: action.payload,
      };
    default:
      return state;
  }
};
