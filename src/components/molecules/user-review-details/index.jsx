import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import { useTheme } from '../../../theme';
import ProfilePicture from '../../../components/atoms/profile-picture';
import ReviewItem from '../review-item';

const UserReviewDetailsCard = (props) => {
  const { Fonts, Gutters, Layout, Common } = useTheme();
  const { review } = props;
  const { reviewer } = review;
  const { ratingOptions } = review;

  const _reviewItems = () => {
    return _.map(ratingOptions, (rating, index) => (
      <ReviewItem
        key={`review-option${_.get(review, 'id')}-${index}`}
        value={_.get(rating, 'value')}
        title={_.get(rating, 'label')}
      />
    ));
  };

  return (
    <View style={[Common.viewCard, Gutters.regularMargin]}>
      <View style={Layout.alignItemsCenter}>
        <ProfilePicture user={reviewer} />
        <Text style={Fonts.textLarge}>{`${_.get(reviewer, 'fullName')}`}</Text>
        <Text style={Fonts.subtitleRegular}>{_.get(_.get(review, 'job', {}), 'description')}</Text>
      </View>
      <View style={Layout.fill}>
        {_reviewItems()}
        <View style={Layout.alignItemsCenter}>
          <Text>Comments</Text>
          <Text style={Fonts.subtitleRegular}>{_.get(review, 'comment')}</Text>
        </View>
      </View>
    </View>
  );
};

UserReviewDetailsCard.propTypes = {
  review: PropTypes.object.isRequired,
};

UserReviewDetailsCard.defaultProps = {};

export default UserReviewDetailsCard;
