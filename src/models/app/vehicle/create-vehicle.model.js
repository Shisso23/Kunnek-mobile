import _ from 'lodash';

export const createVehicleModel = (_apiVehicleModel = {}) => ({
  id: _.get(_apiVehicleModel, 'id', ''),
  registrationNumber: _.get(_apiVehicleModel, 'registration_number', ''),
  type: _.get(_apiVehicleModel, 'vehicle_type', ''),
  make: _.get(_apiVehicleModel, 'make', ''),
  model: _.get(_apiVehicleModel, 'model', ''),
  collectorId: _.get(_apiVehicleModel, 'collector_id', ''),
});

export const apiCreateVehicleModel = (_appVehicleModel = {}) => ({
  vehicle: {
    registration_number: _.get(_appVehicleModel, 'registrationNumber', ''),
    vehicle_type: _.get(_appVehicleModel, 'type', ''),
    make: _.get(_appVehicleModel, 'make', ''),
    model: _.get(_appVehicleModel, 'model', ''),
    collector_id: _.get(_appVehicleModel, 'collectorId', ''),
  },
});
