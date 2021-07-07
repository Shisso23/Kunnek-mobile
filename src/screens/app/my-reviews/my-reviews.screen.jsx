import React from 'react';
import PropTypes from 'prop-types';
import Index from '../../../components/atoms/title';
import { useTheme } from '../../../theme';
import { ScrollView, Text } from 'react-native';
import { UserReviewDetailsCard } from '../../../components';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';

const MyReviewsScreen = ({ route }) => {
  const { Fonts, Gutters } = useTheme();
  const { reviews } = route.params;
  const { user } = useSelector(userSelector);

  const _renderReviews = () => {
    return _.map(reviews, (review) => {
      if (_.get(user, 'id') !== _.get(review.reviewer, 'id'))
        return <UserReviewDetailsCard key={_.get(review, 'id')} review={review} />;
    });
  };

  return (
    <>
      <Index title="My Reviews" />
      <Text style={[Fonts.subtitleRegular, Gutters.regularHPadding]}>
        See your previous reviews that clients have left you.
      </Text>
      <ScrollView>{_renderReviews()}</ScrollView>
    </>
  );
};

MyReviewsScreen.propTypes = {
  route: PropTypes.object,
};

export default MyReviewsScreen;
