import {
  constructUserVehicleModels,
  userVehicleModel,
} from '../../../models/app/user/user-vehicles.model';
import { apiCreateVehicleModel } from '../../../models/app/vehicle/create-vehicle.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import vehicleUrls from './vehicle.urls';

const getVehicles = async () => {
  const url = vehicleUrls.vehiclesUrl();
  const apiResponse = await authNetworkService.get(url);
  return constructUserVehicleModels(apiResponse.data);
};

const createVehicle = (data = {}) => {
  const url = vehicleUrls.vehiclesUrl();
  const dataModel = apiCreateVehicleModel(data);
  return authNetworkService
    .post(url, dataModel)
    .then((response) => {
      return userVehicleModel(response.data);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

export default {
  getVehicles,
  createVehicle,
};
