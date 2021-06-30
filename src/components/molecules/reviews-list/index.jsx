import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { ListItem, Text, Avatar, Rating } from 'react-native-elements';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';

const ReviewsList = ({ items }) => {
  const { Common, Gutters } = useTheme();

  if (_.isEmpty(items)) {
    return null;
  }

  const _getAvatar = (picture) => {
    if (picture !== null) {
      return <Avatar rounded source={{ uri: picture }} />;
    }
    return <Avatar rounded icon={{ name: 'user', type: 'font-awesome-5', color: 'black' }} />;
  };

  const _renderItems = () => {
    return _.slice(
      _.map(items, (item, index) => (
        <ListItem key={`review-${index}`}>
          {_getAvatar(_.get(item, 'reviewer.profile_picture', ''))}
          <ListItem.Content>
            <Rating readonly startingValue={_.get(item, 'rating', '')} imageSize={14} />
            <ListItem.Subtitle>{_.get(item, 'job.description', '')}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )),
      0,
      4,
    );
  };

  return (
    <>
      <View style={[Common.viewCard, Gutters.smallVMargin]}>
        <Text>My Reviews</Text>
        {_renderItems()}
      </View>
    </>
  );
};

ReviewsList.propTypes = {
  items: PropTypes.array,
};

ReviewsList.defaultProps = {
  items: [],
};

export default ReviewsList;
