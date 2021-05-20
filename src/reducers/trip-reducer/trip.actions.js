import { tripService } from '../../services';
import { setTripsAction } from './trip.reducer';

export const getTripsAction = (params = {}) => (dispatch) => {
  return tripService.getAll(params).then((trips) => {
    return dispatch(setTripsAction(trips));
  });
};
