import _ from 'lodash';

import { actionsService, parcelRequestService } from '../../services';
import {
  setActionIdAction,
  setParcelRequestLoadingAction,
  setParcelRequestsAction,
  setServiceFeeAction,
  setFilterParcelsAction,
  setParcelsFilterFieldsAction,
  setUserParcelRequestsAction,
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

export const getUserParcelRequestsAction = (params = {}) => (dispatch) => {
  dispatch(setParcelRequestLoadingAction(true));
  return parcelRequestService
    .getAll(params)
    .then((parcelRequests) => {
      return dispatch(setUserParcelRequestsAction(parcelRequests));
    })
    .finally(() => {
      dispatch(setParcelRequestLoadingAction(false));
    });
};

export const checkUserParcelRequestsAction = (params = {}) => (dispatch, getState) => {
  const { userParcelRequests } = getState().parcelRequestReducer;
  return parcelRequestService.getAll(params).then((parcelRequests) => {
    if (parcelRequests !== userParcelRequests) {
      return dispatch(setUserParcelRequestsAction(parcelRequests));
    }
  });
};

export const checkParcelRequestAction = (id) => () => {
  return parcelRequestService.get(id);
};

export const removeParcelRequest = (id) => () => {
  return parcelRequestService.remove(id);
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
      dispatch(setParcelRequestLoadingAction(false));
    });
};

export const getActionId = (parcelRequest) => (dispatch) => {
  const jobId = _.get(parcelRequest, 'id');
  return actionsService.getActionId(jobId).then((response) => {
    return dispatch(setActionIdAction(response));
  });
};

export const verifyParcelDelivery = (id, otpValue) => () => {
  return actionsService.verifyOTP(id, { otp: otpValue }).then((otpResponse) => {
    return _.get(otpResponse, 'status');
  });
};

export const sendOTP = (id) => () => {
  return actionsService.sendOtp(id);
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
    const { userParcelRequests = [] } = getState().parcelRequestReducer;
    return dispatch(setUserParcelRequestsAction([...userParcelRequests, parcelRequest]));
  });

export const updateParcelRequestAction = (id, parcelRequest) => (dispatch, getState) => {
  dispatch(setParcelRequestLoadingAction(true));

  const { userParcelRequests = [] } = getState().parcelRequestReducer;
  const parcelRequestIndex = _.findIndex(userParcelRequests, (parcel) => {
    return parcel.id === parcelRequest.id;
  });
  return parcelRequestService
    .update(id, parcelRequest)
    .then((response) => {
      userParcelRequests[parcelRequestIndex] = response;
      return dispatch(setUserParcelRequestsAction(userParcelRequests));
    })
    .finally(() => {
      dispatch(setParcelRequestLoadingAction(false));
    });
};

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
