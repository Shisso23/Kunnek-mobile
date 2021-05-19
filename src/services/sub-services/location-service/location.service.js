import _ from 'lodash';

const getPoints = (locations = []) => locations.map((location) => getPoint(location));

const getPoint = (location) => {
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

export default {
  getPoint,
  getPoints,
};
