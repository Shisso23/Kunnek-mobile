import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Overlay } from 'react-native-elements';

import FilterParcel from '../../forms/parcel-filter/filter-parcels.form';
import FormScreenContainer from '../../containers/form-screen-container/form-screen.container';

const ParcelFilterFormModal = ({ visible }) => {
  const [isVisible, setIsVisible] = useState(false);
  const submitForm = () => {};
  const onSuccess = () => {};

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  return (
    <Overlay isVisible={isVisible} onBackdropPress={() => {}} overlayStyle={styles.overlay}>
      <FormScreenContainer>
        <FilterParcel
          initialValues={{ lastDeliveryDate: new Date(1598051730000) }}
          submitForm={submitForm}
          onSuccess={onSuccess}
        />
      </FormScreenContainer>
    </Overlay>
  );
};

ParcelFilterFormModal.propTypes = {
  visible: PropTypes.bool.isRequired,
};

ParcelFilterFormModal.defaultProps = {};

export default ParcelFilterFormModal;

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 15,
    width: '99%',
  },
});
