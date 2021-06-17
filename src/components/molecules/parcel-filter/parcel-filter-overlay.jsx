import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Overlay } from 'react-native-elements';
import { useTheme } from '../../../theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';

import FilterParcel from '../../forms/parcel-filter/filter-parcels.form';
import FormScreenContainer from '../../containers/form-screen-container/form-screen.container';
import {
  filterParcelRquestsAction,
  setFilters,
} from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import { filtersFormModel } from '../../../models/app/parcel-filter/parcel-filter-form.model';

const ParcelFilterFormModal = ({ visible, setFilterClosed }) => {
  const initialFilters = useSelector(
    (reducers) => reducers.parcelRequestReducer.parcelFilterFields || filtersFormModel(),
  );

  const [isVisible, setIsVisible] = useState(visible);
  const { Custom, Layout, Gutters } = useTheme();
  const dispatch = useDispatch();

  const submitForm = async (formData) => {
    dispatch(setFilters(formData));
    return dispatch(filterParcelRquestsAction(formData));
  };
  const clearInitialFormValues = () => {
    dispatch(setFilters(filtersFormModel()));
  };
  const onSuccess = () => {
    closeModal();
  };

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const closeModal = () => {
    setIsVisible(false);
    setFilterClosed();
  };

  return (
    <Overlay isVisible={isVisible} overlayStyle={styles.overlay}>
      <FormScreenContainer>
        <TouchableOpacity
          onPress={closeModal}
          style={[Custom.closeButton, Layout.alignSelfEnd, Gutters.tinyMargin]}
        >
          <Icon name="times-circle" size={25} />
        </TouchableOpacity>
        <FilterParcel
          initialValues={initialFilters}
          submitForm={submitForm}
          onSuccess={onSuccess}
          clearInitialFormValues={clearInitialFormValues}
        />
      </FormScreenContainer>
    </Overlay>
  );
};

ParcelFilterFormModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setFilterClosed: PropTypes.func.isRequired,
};

ParcelFilterFormModal.defaultProps = {};

export default ParcelFilterFormModal;

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 15,
    bottom: 0,
    position: 'absolute',
    width: '99%',
  },
});
