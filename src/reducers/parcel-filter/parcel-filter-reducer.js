import CreateAction from '../action-utilities/action-creator';

const reducerName = 'parcelsFilter';

const setIsLoading = new CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const filterParcels = new CreateAction(reducerName, 'SET_FILTERED_PARCELS');
export const filterParcelsAction = filterParcels.action;

const initialState = {};

export default function parcelsFilterReducer(state = initialState, action) {
  switch (action.type) {
    case setIsLoading.actionType:
      return { ...state, isLoading: action.payload };
    case filterParcels.actionType:
      return { ...state, filteredParcels: action.payload };

    default:
      return state;
  }
}
