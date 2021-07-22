import _ from 'lodash';
import { updateObjectArray } from '../../helpers/data.helper';
import { flashService, vehicleService } from '../../services';
import { setUserVehiclesAction, setVehiclesLoadingAction } from './user.reducer';

export const getUserVehiclesAction = () => async (dispatch) => {
  dispatch(setVehiclesLoadingAction(true));
  try {
    const vehicles = await vehicleService.getVehicles();
    dispatch(setUserVehiclesAction(vehicles));
  } catch (error) {
    flashService.error('Could not load vehicles');
    // eslint-disable-next-line no-console
    console.warn(error.message);
  } finally {
    dispatch(setVehiclesLoadingAction(false));
  }
};

export const createVehicleAction = (data = {}) => (dispatch, getState) => {
  dispatch(setVehiclesLoadingAction(true));

  return vehicleService
    .createVehicle(data)
    .then((newVehicle) => {
      const { vehicles } = getState().userReducer;
      return dispatch(setUserVehiclesAction([...vehicles, newVehicle]));
    })
    .finally(() => dispatch(setVehiclesLoadingAction(false)));
};

export const deleteVehicleAction = (id) => (dispatch, getState) => {
  dispatch(setVehiclesLoadingAction(true));

  return vehicleService
    .deleteVehicle(id)
    .then(() => {
      const { vehicles } = getState().userReducer;

      _.remove(vehicles, (vehicle) => {
        return _.get(vehicle, 'id') === id;
      });

      return dispatch(setUserVehiclesAction(vehicles));
    })
    .finally(() => dispatch(setVehiclesLoadingAction(false)));
};

export const editVehicleAction = (data = {}) => (dispatch, getState) => {
  dispatch(setVehiclesLoadingAction(true));
  const id = _.get(data, 'id', '');

  return vehicleService
    .updateVehicle(id, data)
    .then((changedVehicle) => {
      const { vehicles } = getState().userReducer;

      return dispatch(setUserVehiclesAction(updateObjectArray(vehicles, changedVehicle)));
    })
    .finally(() => {
      dispatch(setVehiclesLoadingAction(false));
    });
};
