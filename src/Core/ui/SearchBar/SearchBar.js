import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {useColorScheme} from 'react-native-appearance';
import dynamicStyles from './styles';
import SearchBox from 'react-native-search-box';
import {Localized} from '../../localization/Localization';

export default function SearchBar(props) {
  const {
    onChangeText,
    onSearchBarCancel,
    onSearchClear,
    searchRef,
    appStyles,
  } = props;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const onSearchTextChange = (text) => {
    onChangeText(text);
  };

  const onCancel = () => {
    onSearchTextChange('');
    onSearchBarCancel();
  };

  return (
    <View style={styles.container}>
      <SearchBox
        ref={searchRef}
        backgroundColor={'transparent'}
        cancelTitle={Localized('Cancel')}
        cancelButtonTextStyle={styles.cancelButtonText}
        inputBorderRadius={9}
        onChangeText={onSearchTextChange}
        onCancel={onCancel}
        onDelete={onSearchClear}
        inputStyle={styles.searchInput}
      />
    </View>
  );
}

SearchBar.propTypes = {
  onSearchBarCancel: PropTypes.func,
  onSearchClear: PropTypes.func,
  searchRef: PropTypes.object,
};
