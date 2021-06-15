import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Overlay } from 'react-native-elements';
import { useTheme } from '../../../theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';

import FilterParcel from '../../forms/parcel-filter/filter-parcels.form';
import FormScreenContainer from '../../containers/form-screen-container/form-screen.container';
import { filtersFormModel } from '../../../models/app/parcel-filter/parcel-filter-form.model';
import { filterParcelRquestsAction } from '../../../reducers/parcel-request-reducer/parcel-request.actions';

const ParcelFilterFormModal = ({ visible, setFilterClosed }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const { Custom, Layout, Gutters } = useTheme();
  const dispatch = useDispatch();

  const submitForm = async (formData) => {
    return dispatch(filterParcelRquestsAction(formData));
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
          initialValues={filtersFormModel()}
          submitForm={submitForm}
          onSuccess={onSuccess}
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