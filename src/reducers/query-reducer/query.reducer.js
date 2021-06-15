import CreateAction from '../action-utilities/action-creator';

const reducerName = 'queries';

const getQueriesLoading = CreateAction(reducerName, 'GET_QUERIES_LOADING');
export const getQueryLoadingAction = getQueriesLoading.action;

const getQueries = CreateAction(reducerName, 'GET_QUERIES');
export const getQueriesAction = getQueries.action;

const setQueryLoading = CreateAction(reducerName, 'SET_QUERY_LOADING');
export const setQueryLoadingAction = setQueryLoading.action;

const setQuery = CreateAction(reducerName, 'SET_QUERY');
export const setQueryAction = setQuery.action;

const initialState = {
  queriesLoading: false,
  queries: [],
  currentQuery: {},
  queryLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case getQueriesLoading.actionType:
      return {
        ...state,
        queriesLoading: action.payload,
      };
    case getQueries.actionType:
      return {
        ...state,
        queries: action.payload,
      };
    case setQuery:
      return {
        ...state,
        currentQuery: action.payload,
      };
    case setQueryLoading:
      return {
        ...state,
        queryLoading: action.payload,
      };
    default:
      return state;
  }
};
