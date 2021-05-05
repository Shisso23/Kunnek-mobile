import { parcelRequestService } from '../../services';

export const createParcelRequestAction = (data) => (dispatch, getState) =>
  parcelRequestService.create(data).then((parcelRequest) => {
    const { parcelRequests = [] } = getState().parcelRequestReducer;
    dispatch([...parcelRequests, parcelRequest]);
  });
