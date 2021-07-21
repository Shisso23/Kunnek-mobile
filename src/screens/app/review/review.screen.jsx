import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import useTheme from '../../../theme/hooks/useTheme';
import { ReviewDriverForm, ReviewSenderForm } from '../../../components/forms';
import Index from '../../../components/atoms/title';
import {
  reviewTheDriver,
  reviewTheSender,
} from '../../../reducers/reviews-reducer/reviews.actions';
import { successful } from '../../../helpers/errors.helper';
import { getParcelRequestAction } from '../../../reducers/parcel-request-reducer/parcel-request.actions';
import { useEffect } from 'react';
import { useState } from 'react';

const ReviewScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [parcelRequest, setParcelRequest] = useState(route.params.parcelRequest);
  const { user } = useSelector(userSelector);
  const { Layout, Gutters, Fonts } = useTheme();
  useEffect(() => {
    if (typeof parcelRequest === 'string') {
      dispatch(getParcelRequestAction(parcelRequest)).then((request) => {
        setParcelRequest(request);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const deliverer = _.get(parcelRequest, 'deliverer');

  const _isDeliverer = () => {
    return _.get(user, 'id') === _.get(deliverer, 'userId');
  };

  const _otherUser = () => {
    if (_isDeliverer()) {
      return {
        type: 'Sender',
        ..._.get(parcelRequest, 'sender'),
      };
    }
    return {
      type: 'Driver',
      ..._.get(parcelRequest, 'deliverer'),
    };
  };

  const _handleSubmitReviewForm = (currentForm) => {
    if (!_isDeliverer()) {
      return dispatch(reviewTheDriver(parcelRequest, currentForm)).then((response) => {
        if (successful(response)) {
          navigation.navigate('Home');
        }
      });
    } else {
      return dispatch(reviewTheSender(parcelRequest, currentForm)).then((response) => {
        if (successful(response)) {
          navigation.navigate('Home');
        }
      });
    }
  };

  const _renderReviewForm = () => {
    if (!_isDeliverer()) {
      return (
        <ReviewDriverForm
          user={_otherUser()}
          parcelRequest={parcelRequest}
          submitForm={_handleSubmitReviewForm}
        />
      );
    } else {
      return (
        <ReviewSenderForm
          user={_otherUser()}
          parcelRequest={parcelRequest}
          submitForm={_handleSubmitReviewForm}
        />
      );
    }
  };

  return loading ? null : (
    <>
      <Index title={`Review ${_.get(_otherUser(), 'type')}`} />
      <ScrollView Style={Layout.fill} contentContainerStyle={Layout.scrollCenter}>
        <Text style={[Gutters.regularHMargin, Fonts.subtitleRegular]}>
          {`Please rate the ${_.get(
            _otherUser(),
            'type',
          )} fairly. Please list any complaints in the comments section.`}
        </Text>
        {_renderReviewForm()}
      </ScrollView>
    </>
  );
};

ReviewScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

ReviewScreen.defaultProps = {};

export default ReviewScreen;
