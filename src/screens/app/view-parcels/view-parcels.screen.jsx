import React from 'react';
import PropTypes from 'prop-types';

import Index from '../../../components/atoms/title';
import { useTheme } from '../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { ViewParcelCard } from '../../../components';

const ViewParcelsScreen = ({ route }) => {
  const { Layout } = useTheme();
  const parcelRequest = route.params;

  return (
    <>
      <Index title="View Parcel" />
      <ScrollView style={[Layout.fill]} contentContainerStyle={styles.fillScreen}>
        <ViewParcelCard parcelRequest={parcelRequest} />
      </ScrollView>
    </>
  );
};

ViewParcelsScreen.propTypes = {
  route: PropTypes.object,
};

ViewParcelsScreen.defaultProps = {};

export default ViewParcelsScreen;

const styles = StyleSheet.create({
  fillScreen: {
    flexGrow: 1,
  },
});
