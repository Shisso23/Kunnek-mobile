import { queryService } from '../../services';
import {
  getQueriesAction,
  getQueriesLoadingAction,
  setQueryAction,
  setQueryLoadingAction,
} from './query.reducer';

export const getQueries = () => (dispatch) => {
  dispatch(getQueriesLoadingAction(true));
  return queryService
    .getAll()
    .then((queries) => {
      return dispatch(getQueriesAction(queries));
    })
    .finally(() => {
      dispatch(getQueriesLoadingAction(false));
    });
};

export const _setQueryAction = (params) => (dispatch) => {
  dispatch(setQueryLoadingAction(true));
  return dispatch(setQueryAction(params));
};
