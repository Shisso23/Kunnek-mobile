import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { SendParcelItemDetailsForm } from '../../../components/forms';
import { parcelRequestService } from '../../../services';

const SendParcelScreen = () => {
    const { user } = useSelector((reducers) => reducers.parcelRequestReducer);
    const _onFormSuccess = () => {};
    return (
        <View>
            <SendParcelItemDetailsForm
                edit
                submitForm={parcelRequestService.create}
                onSuccess={_onFormSuccess}
                initialValues={parcelRequestService(us)}
            />
        </View>
    );
};

SendParcelScreen.propTypes = {};

SendParcelScreen.defaultProps = {};

export default SendParcelScreen;
