import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const FlatList = (props) => {
  const { data, ListHeaderComponent, ListFooterComponent, renderItem } = props;

  const _renderItems = () => {
    return _.map(data, renderItem);
  };

  return (
    <>
      {ListHeaderComponent()}
      {_renderItems()}
      {ListFooterComponent()}
    </>
  );
};

FlatList.propTypes = {
  data: PropTypes.array.isRequired,
  ListFooterComponent: PropTypes.func,
  ListHeaderComponent: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
};

FlatList.defaultProps = {
  ListHeaderComponent: () => {},
  ListFooterComponent: () => {},
};

export default FlatList;
