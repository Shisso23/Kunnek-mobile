import _ from 'lodash';

import { parcelRequestService } from '../../services';
import {
  setParcelRequestLoadingAction,
  setParcelRequestsAction,
  setServiceFeeAction,
} from './parcel-request.reducer';

export const getParcelRequestsAction = (params = {}) => (dispatch) => {
  dispatch(setParcelRequestLoadingAction(true));
  return parcelRequestService
    .getAll(params)
    .then((parcelRequests) => {
      return dispatch(setParcelRequestsAction(parcelRequests));
    })
    .finally(() => {
      dispatch(setParcelRequestLoadingAction(false));
    });
};

export const updateParcelStatus = (parcelRequest, newStatus) => (dispatch, getState) => {
  dispatch(setParcelRequestLoadingAction(true));

  const { parcelRequests = [] } = getState().parcelRequestReducer;
  const parcelRequestIndex = _.findIndex(parcelRequests, (parcel) => {
    return parcel.id === parcelRequest.id;
  });

  return parcelRequestService
    .updateStatus(_.get(parcelRequest, 'id'), { next_status: newStatus })
    .then(() => {
      parcelRequest.status = newStatus;
      parcelRequests[parcelRequestIndex] = parcelRequest;

      return dispatch(setParcelRequestsAction(parcelRequests));
    })
    .finally(() => {
      dispatch(setParcelRequestLoadingAction(true));
    });
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
