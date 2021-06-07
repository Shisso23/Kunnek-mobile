import _ from 'lodash';

import {
  setCurrentLocationAction,
  setCurrentRoutePointsAction,
  setPointsAction,
} from './maps.reducer';
import { mapService } from '../../services';

export const getDirections = (points = []) => (dispatch) =>
  mapService.getDirections(points).then((response) => {
    dispatch(setPointsAction(response));
  });

export const snapToRoads = (points = []) => (dispatch) =>
  mapService.snapToRoads(points).then((response) => {
    const snappedPoints = _.get(response, 'snappedPoints', []).map((point) =>
      _.get(point, 'location'),
    );
    dispatch(setCurrentRoutePointsAction(snappedPoints));
  });

export const getCurrentLocation = () => (dispatch) =>
  mapService
    .getCurrentLocation()
    .then((coords) => {
      dispatch(setCurrentLocationAction(coords));
      return coords;
    })
    .catch((error) => {
      console.warn(error.code, error.message);
      return { latitude: 0, longitude: 0 };
    });
