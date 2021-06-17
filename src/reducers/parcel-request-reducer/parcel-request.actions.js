import _ from 'lodash';

import { parcelRequestService } from '../../services';
import {
  setParcelRequestLoadingAction,
  setParcelRequestsAction,
  setServiceFeeAction,
  setFilterParcelsAction,
  setParcelsFilterFieldsAction,
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

export const filterParcelRquestsAction = (formData) => {
  return async (dispatch) => {
    return parcelRequestService.filterParcels(formData).then((parcelRequests) => {
      return dispatch(setFilterParcelsAction(parcelRequests));
    });
  };
};

export const setFilters = (formData) => {
  return (dispatch) => {
    return dispatch(setParcelsFilterFieldsAction(formData));
  };
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
