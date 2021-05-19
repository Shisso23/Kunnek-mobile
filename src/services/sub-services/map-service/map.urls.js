import _ from 'lodash';

import Qs from 'qs';
import config from '../../../config';

const baseUrl = 'https://maps.googleapis.com/maps/api';

export default {
  directions: (origin, destination) =>
    `${baseUrl}/directions/json?origin=${origin}&destination=${destination}&key=${config.googleMaps.apiKey}`,
  snapToRoads: (points) => {
    const path = _.reduce(
      points,
      (final, point, index) => {
        final += `${_.get(point, 'latitude')},${_.get(point, 'longitude')}${
          index < points.length - 1 ? '|' : ''
        }`;

        return final;
      },
      '',
    );

    return `https://roads.googleapis.com/v1/snapToRoads?path=${path}&key=${config.googleMaps.apiKey}`;
  },
  googlePlaceAutocompleteUrl: (input, params) =>
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${encodeURIComponent(
      input,
    )}&${Qs.stringify(params)}`,
};
