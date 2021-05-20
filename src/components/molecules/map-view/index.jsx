import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Circle, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import PropTypes from 'prop-types';
import { Badge, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import config from '../../../config';
import { locationService, mapService } from '../../../services';
import { Colors } from '../../../theme/Variables';
import { getCurrentLocation } from '../../../reducers/maps-reducer/maps.actions';

const MapViewComponent = ({ startPoint, endPoint, parcelRequests, onPointPress }) => {
  const dispatch = useDispatch();
  const { currentLocation } = useSelector((state) => state.mapsReducer);
  const regionPoints = [currentLocation];
  const coordinateTypes = ['collect', 'deliver'];

  if (startPoint) {
    regionPoints.push(startPoint);
  }

  if (endPoint) {
    regionPoints.push(endPoint);
  }

  useEffect(() => {
    dispatch(getCurrentLocation());
  }, []);

  const _renderParcelRequestCoordinates = () => {
    const markers = [];
    parcelRequests.forEach((parcelRequest, i) => {
      const locations = _.get(parcelRequest, 'locations', {});
      markers.push(_renderLine(locationService.getCoordinates(locations), `line-${i}`));
      coordinateTypes.forEach((coordinateType, j) => {
        const index = j * coordinateTypes.length + i;
        const coordinate = locationService.getCoordinateFromType(coordinateType, locations);
        markers.push(_renderCoordinate(coordinate, parcelRequest, coordinateType, index));
      });
    });
    return markers;
  };

  const _renderCoordinate = (coordinate, parcelRequest, coordinateType, index) => {
    return (
      <Marker
        key={`${coordinateType}-${index}`}
        coordinate={coordinate}
        onPress={_onPress(parcelRequest)}
        tracksViewChanges={false}
      >
        {_renderMarkerContent(coordinateType, parcelRequest)}
      </Marker>
    );
  };

  const _renderMarkerContent = (coordinateType, parcelRequest) => {
    if (coordinateType === 'collect') {
      return (
        <>
          <Badge status="success" value={`R ${_.get(parcelRequest, 'price', 0.0)}`} />
          <Icon type="font-awesome" name="map-marker" color={Colors.primary} size={40} />
        </>
      );
    }

    return <Icon type="font-awesome" name="circle" color={Colors.darkGrey} size={20} />;
  };

  const _renderCirclePoint = (location, type, radius = 50000) => {
    const coordinate = locationService.getCoordinate(location);

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
        <Marker coordinate={locationService.getCoordinate(location)} tracksViewChanges={false} />
        {circle}
      </View>
    );
  };

  const _renderLine = (points = [], index) => {
    if (points.length < 2) {
      return <></>;
    }

    const processedPoints = points.map((point = {}) => locationService.getCoordinate(point));

    return <Polyline key={index} coordinates={processedPoints} strokeColor={Colors.mapPlotLine} />;
  };

  const _onPress = (item) => () => {
    if (onPointPress) {
      onPointPress(item);
    }
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
        {_renderParcelRequestCoordinates()}
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
