import React from 'react';
import {View, Text} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import dynamicStyles from './styles';
import SearchBox from 'react-native-search-box';
import {Localized} from '../../localization/Localization';

export default function SearchBar(props) {
  const {onSearchBarCancel, searchRef, appStyles} = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const onCancel = () => {
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
        onCancel={onCancel}
        inputStyle={styles.searchInput}
      />
    </View>
  );
}
