import _ from 'lodash';

export const createVehicleModel = (_apiVehicleModel = {}) => ({
  id: _.get(_apiVehicleModel, 'id', ''),
  registrationNumber: _.get(_apiVehicleModel, 'registration_number', ''),
  type: _.get(_apiVehicleModel, 'vehicle_type', ''),
  make: _.get(_apiVehicleModel, 'make', ''),
  model: _.get(_apiVehicleModel, 'model', ''),
  collectorId: _.get(_apiVehicleModel, 'collector_id', ''),
});

export const apiCreateVehicleModel = (_appUserModel = {}) => ({
  user: {
    email: _.get(_appUserModel, 'email', ''),
    name: _.get(_appUserModel, 'name', ''),
  },
});
