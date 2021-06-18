import _ from 'lodash';
import * as geolib from 'geolib';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';

import networkService from '../network-service/network.service';
import mapUrls from './map.urls';
import config from '../../../config';
import permissionsService from '../permissions-service/permissions-service';

const getDirections = (points = []) => {
  const origin = _.nth(points, 0);
  const destination = _.nth(points, points.length - 1);
  const url = mapUrls.directions(origin, destination);
  return networkService.get(url);
};

const snapToRoads = (points = []) => {
  const url = mapUrls.snapToRoads(points);
  return networkService.get(url);
};

const geocode = (value, type = 'address') =>
  Geocoder.from(value)
    .then((json) => {
      const coordinate =
        type === 'address'
          ? _.get(_.nth(json.results, 0), 'geometry.location')
          : _.nth(_.get(_.nth(json.results, 0), 'address_components'), 0);

      return { latitude: _.get(coordinate, 'lat'), longitude: _.get(coordinate, 'lon') };
    })
    .catch((error) => console.warn(error.message));

const getGooglePlacesAutocomplete = (inputText, params) => {
  const url = mapUrls.googlePlaceAutocompleteUrl(inputText, {
    key: config.googleMaps.apiKey,
    ...params,
  });
  return networkService.get(url).then((response) => _.get(response, 'data', {}));
};

const getCurrentLocation = async () => {
  const hasLocationAccess = await permissionsService.requestLocationPermission();
  let coords = {};
  return new Promise((resolve, reject) => {
    if (hasLocationAccess) {
      Geolocation.getCurrentPosition(
        (location) => {
          coords = {
            latitude: _.get(location, 'coords.latitude'),
            longitude: _.get(location, 'coords.longitude'),
          };

          resolve(coords);
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } else {
      reject(new Error('Location permissions have not been granted.'));
    }
  });
};

const getDistance = (point1, point2) => geolib.getDistance(point1, point2);

const obfuscatePoint = (location) => ({
  latitude: _.get(location, 'obfuscated_latitude', 0),
  longitude: _.get(location, 'obfuscated_longitude', 0),
});

const parseLatLngPoint = (json) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.warn(`Couldn't parse location json`);
  }

  return { latitude: 0, longitude: 0 };
};

const getCoordinate = (point) => ({
  latitude: Number(_.get(point, 'latitude', 0)),
  longitude: Number(_.get(point, 'longitude', 0)),
});

const getRegionForCoordinates = (coordinates = []) => {
  let minX;
  let maxX;
  let minY;
  let maxY;

  const coordinate = _.nth(coordinates, 0);

  minX = _.get(coordinate, 'latitude', 0);
  maxX = _.get(coordinate, 'latitude', 0);
  minY = _.get(coordinate, 'longitude', 0);
  maxY = _.get(coordinate, 'longitude', 0);

  coordinates.forEach((currentCoordinate) => {
    const latitude = Number(_.get(currentCoordinate, 'latitude', 0));
    const longitude = Number(_.get(currentCoordinate, 'longitude', 0));
    minX = Math.min(minX, latitude);
    maxX = Math.max(maxX, latitude);
    minY = Math.min(minY, longitude);
    maxY = Math.max(maxY, longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = maxX - minX;
  const deltaY = maxY - minY;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX + 1,
    longitudeDelta: deltaY + 1,
  };
};

export default {
  getDirections,
  snapToRoads,
  geocode,
  getCurrentLocation,
  getDistance,
  obfuscatePoint,
  getGooglePlacesAutocomplete,
  parseLatLngPoint,
  getCoordinate,
  getRegionForCoordinates,
};
