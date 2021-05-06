import _ from 'lodash';
import { parcelRequestService } from '../../services';
import {
  setParcelRequestLoadingAction,
  setParcelRequestsAction,
  setServiceFeeAction,
} from './parcel-request.reducer';

export const getParcelRequestsAction = (params = {}) => (dispatch) => {
  parcelRequestService
    .getAll(params)
    .then((parcelRequests) => dispatch(setParcelRequestsAction(parcelRequests)));
};

export const createParcelRequestAction = (data) => (dispatch, getState) =>
  parcelRequestService.create(data).then((parcelRequest) => {
    const { parcelRequests = [] } = getState().parcelRequestReducer;
    return dispatch(setParcelRequestsAction([...parcelRequests, parcelRequest]));
  });

export const getServiceFee = (parcelRequestId) => (dispatch) => {
  dispatch(setParcelRequestLoadingAction(true));

  return parcelRequestService
    .getServiceFee(parcelRequestId)
    .then((data) => {
      dispatch(setServiceFeeAction(_.get(data, 'service_fee')));
      return _.get(data, 'service_fee');
    })
    .finally(() => {
      dispatch(setParcelRequestLoadingAction(false));
    });
};
