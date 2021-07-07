import { tripService } from '../../services';
import { setTripLoadingAction, setTripsAction } from './trip.reducer';

export const getTripsAction = (params = {}) => (dispatch) => {
  dispatch(setTripLoadingAction(true));
  return tripService
    .getAll(params)
    .then((trips) => {
      return dispatch(setTripsAction(trips));
    })
    .finally(() => {
      dispatch(setTripLoadingAction(false));
    });
};

export const createTripAction = (data = {}) => (dispatch) => {
  dispatch(setTripLoadingAction(true));
  return tripService
    .create(data)
    .then((result) => {
      return result;
    })
    .finally(() => {
      dispatch(setTripLoadingAction(false));
    });
};
