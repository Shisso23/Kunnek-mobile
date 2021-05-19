import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Circle } from 'react-native-maps';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import config from '../../../config';
import { locationService, mapService } from '../../../services';
import { Colors } from '../../../theme/Variables';
import { getCurrentLocation } from '../../../reducers/maps-reducer/maps.actions';

const MapViewComponent = ({
  startPoint,
  endPoint,
  parcelRequests = [],
  types = [],
  onPointPress,
}) => {
  const dispatch = useDispatch();
  const { currentLocation } = useSelector((state) => state.mapsReducer);
  const regionPoints = [currentLocation];
  if (startPoint) {
    regionPoints.push(startPoint);
  }

  if (endPoint) {
    regionPoints.push(endPoint);
  }

  useEffect(() => {
    dispatch(getCurrentLocation());
  }, []);

  const _renderParcelRequests = () => {
    const markers = [];
    parcelRequests.forEach((item, i) => {
      markers.push(
        _renderLine(locationService.getPoints(_.get(item, 'locations', [])), `line-${i}`),
      );
      types.forEach((type, j) => {
        const index = j * types.length + i;
        markers.push(_renderPoint(item, index, type));
      });
    });
    return markers;
  };

  const _renderPoint = (item, type, index) => {
    const point = locationService.getPoint(item);

    return (
      <Marker key={index} coordinate={point} onPress={_onPress(item)} tracksViewChanges={false}>
        {_renderPointContent(item, _.get(type, 'name'))}
      </Marker>
    );
  };

  const _renderCirclePoint = (location, type, radius = 50000) => {
    const coordinate = locationService.getPoint(location);

    const circle = (
      <Circle
        center={coordinate}
        radius={radius}
        fillColor={Colors.mapCircleGreen}
        strokeWidth={1}
        strokeColor={Colors.transparent}
      />
    );

    return (
      <View>
        <Marker coordinate={locationService.getPoint(location)} tracksViewChanges={false} />
        {circle}
      </View>
    );
  };

  const _renderPointContent = (item) => {
    const icon = <Icon {..._getIcon(item)} color={Colors.darkGrey} size={40} />;

    return <View>{icon}</View>;
  };

  const _renderLine = (points = [], index) => {
    if (points.length < 2) {
      return <></>;
    }

    const distance = mapService.getDistance(_.nth(points, 0), _.nth(points, 1));
    const dashInterval = !Number.isNaN(distance) ? distance / 200 : 500;
    const processedPoints = points.map((point = {}) => locationService.getPoint(point));

    return (
      <Polyline
        key={index}
        coordinates={processedPoints}
        strokeColor={Colors.mapPlotLine}
        lineDashPattern={[dashInterval, dashInterval]}
      />
    );
  };

  const _onPress = (item) => () => {
    if (onPointPress) {
      onPointPress(item);
    }
  };

  const _getIcon = (location) => _.get(location, 'icon', { name: 'map-marker' });

  const _getPointFromType = (item, type) => {

  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initalRegion={mapService.getRegionForCoordinates(regionPoints)}
        {...config.googleMaps}
      >
        <>
          <Marker
            coordinate={locationService.getCoordinate(currentLocation)}
            tracksViewChanges={false}
          />
        </>
        {_renderCirclePoint(startPoint, 'start', 50000)}
        {_renderCirclePoint(endPoint, 'end', 50000)}
        {_renderParcelRequests()}
      </MapView>
    </View>
  );
};

MapViewComponent.propTypes = {
  parcelRequests: PropTypes.array,
  startPoint: PropTypes.object,
  endPoint: PropTypes.object,
  obfuscate: PropTypes.bool,
  types: PropTypes.arrayOf(PropTypes.string),

  onPointPress: PropTypes.func,
  getPoint: PropTypes.func,
};

MapViewComponent.defaultProps = {
  parcelRequests: [],
  startPoint: {},
  endPoint: {},
  obfuscate: false,
  types: [],
  onPointPress: () => {},
  getPoint: () => {},
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapViewComponent;
