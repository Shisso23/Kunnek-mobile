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
