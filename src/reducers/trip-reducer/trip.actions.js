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
