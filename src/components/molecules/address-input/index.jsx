import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text, View, ViewPropTypes } from 'react-native';
import { Button, ListItem, Overlay, SearchBar } from 'react-native-elements';
import _ from 'lodash';

import { mapService } from '../../../services';
import config from '../../../config';
import EmptyListState from '../../atoms/empty-list-state';
import ListLoader from '../../atoms/list-loader';
import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import InputWrapper from '../input-wrapper';

const AddressInput = ({ value, errorMessage, onChange, placeholder, style }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { Custom } = useTheme();

  const renderHeader = () => (
    <View>
      <Text>{placeholder}</Text>
      <Button
        icon={{
          name: 'close',
          color: Colors.inputBackground,
          type: 'material',
          size: 20,
        }}
        onPress={hideModal}
        buttonStyle={Custom.closeButton}
      />
    </View>
  );

  const renderSearchBar = () => (
    <SearchBar value={searchText} placeholder="Enter address" onChangeText={onSearch} />
  );

  const renderList = () => (
    <View>
      <ListLoader isEmpty={results.length === 0} isLoading={isLoading}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={results}
          ListEmptyComponent={emptyListComponent}
          renderItem={renderListItem}
          refreshing={isLoading}
        />
      </ListLoader>
    </View>
  );

  const renderListItem = ({ item }) => {
    const address = _.get(item, 'description');
    return (
      <ListItem key={_.get(item, 'id')} onPress={onSelect(address)}>
        <ListItem.Content>
          <ListItem.Title>{address}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  const emptyListComponent = () => <EmptyListState message="No Results" isLoading={isLoading} />;

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const onSelect = (currentValue) => () => {
    setSearchText(currentValue);
    setResults([]);
    setModalVisible(false);

    if (onChange) {
      onChange(currentValue);
    }
  };

  const search = (currentValue) => {
    mapService
      .getGooglePlacesAutocomplete(currentValue, {
        key: config.googleMaps.apiKey,
        components: 'country:za',
      })
      .then((response) => {
        setResults(_.get(response, 'predictions', []));
        setIsLoading(false);
      });
  };

  const debouncedSearch = _.debounce(search, 2000);

  const onSearch = (currentValue) => {
    setSearchText(currentValue);
    setIsLoading(true);
    debouncedSearch(currentValue);
  };

  const getResultText = () => (!_.isEmpty(searchText) ? searchText : value);

  return (
    <View>
      <InputWrapper
        label={placeholder}
        errorMessage={errorMessage}
      >
        <Button onPress={showModal}>{getResultText()} </Button>
      </InputWrapper>
      <Overlay onBackdropPress={hideModal} isVisible={modalVisible}>
        <View>
          {renderHeader()}
          {renderSearchBar()}
          {renderList()}
        </View>
      </Overlay>
    </View>
  );
};

AddressInput.propTypes = {
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  style: ViewPropTypes.style,

  onChange: PropTypes.func.isRequired,
};

AddressInput.defaultProps = {
  errorMessage: '',
  placeholder: '',
  style: {},
};

export default AddressInput;
