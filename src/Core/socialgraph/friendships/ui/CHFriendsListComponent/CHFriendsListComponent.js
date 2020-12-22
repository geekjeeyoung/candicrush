import React from 'react';
import {View, Text} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import {CHUserSearchModal} from '../..';
import {SearchBarAlternate} from '../../../..';
import {Localized} from '../../../../localization/Localization';
import {TNEmptyStateView} from '../../../../truly-native';
import dynamicStyles from './styles';

function CHFriendsListComponent(props) {
  const {
    searchBarRef,
    searchBar,
    onSearchBarPress,
    isSearchModalOpen,
    onSearchModalClose,
    appStyles,
    onSearchBarCancel,
    emptyStateConfig,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  return (
    <View style={styles.container}>
      {searchBar && (
        <SearchBarAlternate
          onPress={onSearchBarPress}
          placeholderTitle={Localized('Search for friends')}
          appStyles={appStyles}
        />
      )}
      <View style={styles.emptyViewContainer}>
        <TNEmptyStateView
          emptyStateConfig={emptyStateConfig}
          appStyles={appStyles}
        />
      </View>
      <CHUserSearchModal
        onSearchBarCancel={onSearchBarCancel}
        isModalOpen={isSearchModalOpen}
        onClose={onSearchModalClose}
        searchBarRef={searchBarRef}
        appStyles={appStyles}
      />
    </View>
  );
}

export default CHFriendsListComponent;
