import React from 'react';
import _ from 'lodash';
import { ListItem, Text, Avatar, Rating } from 'react-native-elements';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const ReviewsList = ({ items, readOnly }) => {
  const { Common, Gutters } = useTheme();
  const navigation = useNavigation();

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
          {_getAvatar(_.get(item, 'reviewer.profilePictureUri', ''))}
          <ListItem.Content>
            <ListItem.Title>{_.get(item, 'reviewer.fullName', '')}</ListItem.Title>
            <ListItem.Subtitle>{_.get(item, 'job.description', '')}</ListItem.Subtitle>
          </ListItem.Content>
          <Rating readonly startingValue={_.get(item, 'rating', '')} imageSize={14} />
        </ListItem>
      )),
      0,
      4,
    );
  };

  return (
    <>
      <TouchableOpacity
        style={[Common.viewCard, Gutters.smallVMargin]}
        onPress={() =>
          navigation.navigate('MyReviews', { reviews: items, publicReviews: readOnly })
        }
      >
        <Text>{`${readOnly ? 'R' : 'My r'}eviews`}</Text>
        {_renderItems()}
      </TouchableOpacity>
    </>
  );
};

ReviewsList.propTypes = {
  items: PropTypes.array,
  readOnly: PropTypes.bool,
};

ReviewsList.defaultProps = {
  items: [],
  readOnly: false,
};

export default ReviewsList;
