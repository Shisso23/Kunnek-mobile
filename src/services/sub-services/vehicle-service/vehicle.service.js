import { constructUserVehicleModels } from '../../../models/app/user/user-vehicles.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import vehicleUrls from './vehicle.urls';

const getVehicles = async () => {
  const url = vehicleUrls.vehiclesUrl();
  const apiResponse = await authNetworkService.get(url);
  return constructUserVehicleModels(apiResponse.data);
};

export default {
  getVehicles,
};
