import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { ListItem, Text, Avatar, Rating } from 'react-native-elements';
import PropTypes from 'prop-types';
import useTheme from '../../../theme/hooks/useTheme';
import { FlatList } from '../../containers';

const getAvatar = (picture) => {
  if (picture !== null) {
    return <Avatar rounded source={{ uri: picture }} />;
  }
  return <Avatar rounded icon={{ name: 'user', type: 'font-awesome-5', color: 'black' }} />;
};

const ReviewsList = ({ items }) => {
  const { Common, Gutters } = useTheme();

  const ListHeader = () => <Text>My Reviews</Text>;

  if (_.isEmpty(items)) {
    return null;
  }

  return (
    <>
      <View style={[Common.viewCard, Gutters.smallVMargin]}>
        <FlatList
          data={items}
          ListHeaderComponent={ListHeader}
          renderItem={(item, index) => (
            <ListItem key={index}>
              {getAvatar(_.get(item, 'reviewer.profile_picture', ''))}
              <ListItem.Content>
                <Rating readonly startingValue={_.get(item, 'rating', '')} imageSize={14} />
                <ListItem.Subtitle>{_.get(item, 'job.description', '')}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )}
        />
      </View>
    </>
  );
};

ReviewsList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ReviewsList;
