import _ from 'lodash';

const getCoordinates = (locations = []) => locations.map((location) => getCoordinate(location));

const getCoordinate = (location) => {
  const newLocation = {
    latitude: parseFloat(_.get(location, 'latitude', 0)),
    longitude: parseFloat(_.get(location, 'longitude', 0)),
  };

  return Object.keys(newLocation).reduce((object, current) => {
    const value = newLocation[current];
    object[current] = Number.isNaN(value) ? 0 : value;

    return object;
  }, {});
};

const getCoordinateFromType = (type, locations = []) => {
  const location = locations.find((location) => _.get(location, 'type') === type);

  return getCoordinate(location);
};

export default {
  getCoordinate,
  getCoordinates,
  getCoordinateFromType,
};
