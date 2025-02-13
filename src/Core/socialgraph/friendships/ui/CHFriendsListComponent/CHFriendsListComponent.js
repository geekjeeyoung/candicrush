import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import {CHFriendItem, CHUserSearchModal} from '../..';
import {SearchBarAlternate} from '../../../..';
import {Localized} from '../../../../localization/Localization';
import {TNEmptyStateView} from '../../../../truly-native';
import dynamicStyles from './styles';
import PropTypes from 'prop-types';
import TNActivityIndicator from '../../../../truly-native/TNActivityIndicator';

function CHFriendsListComponent(props) {
  const {
    searchBar,
    containerStyle,
    onFriendAction,
    searchBarRef,
    friendsData,
    onSearchBarPress,
    isSearchModalOpen,
    onSearchModalClose,
    appStyles,
    onSearchBarCancel,
    emptyStateConfig,
    isLoading,
    searchData,
    onSearchTextChange,

    onFriendItemPress,
    followEnabled,

    onSearchClear,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const renderItem = ({item, index}) => (
    <CHFriendItem
      onFriendItemPress={onFriendItemPress}
      item={item}
      onFriendAction={onFriendAction}
      appStyles={appStyles}
      followEnabled={followEnabled}
    />
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {searchBar && (
        <SearchBarAlternate
          onPress={onSearchBarPress}
          placeholderTitle={Localized('Search for friends')}
          appStyles={appStyles}
        />
      )}
      {friendsData && friendsData.length > 0 && (
        <FlatList
          data={friendsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.user.id}
          removeClippedSubviews={true}
        />
      )}
      {friendsData && friendsData.length <= 0 && (
        <View style={styles.emptyViewContainer}>
          <TNEmptyStateView
            emptyStateConfig={emptyStateConfig}
            appStyles={appStyles}
          />
        </View>
      )}
      <CHUserSearchModal
        onSearchBarCancel={onSearchBarCancel}
        onSearchClear={onSearchClear}
        data={searchData}
        onSearchTextChange={onSearchTextChange}
        isModalOpen={isSearchModalOpen}
        onClose={onSearchModalClose}
        searchBarRef={searchBarRef}
        onAddFriend={onFriendAction}
        onFriendItemPress={onFriendItemPress}
        appStyles={appStyles}
        followEnabled={followEnabled}
      />
      {isLoading && <TNActivityIndicator />}
    </View>
  );
}

CHFriendsListComponent.propTypes = {
  onFriendItemPress: PropTypes.func,
  searchBar: PropTypes.bool,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  friendsData: PropTypes.array,
  onSearchBarPress: PropTypes.func,
  onSearchBarCancel: PropTypes.func,
  searchData: PropTypes.array,
  onSearchTextChange: PropTypes.func,
  isSearchModalOpen: PropTypes.bool,
  onSearchModalClose: PropTypes.func,
  searchBarRef: PropTypes.object, // type of createRef() is object;
  onSearchClear: PropTypes.func,
};

export default CHFriendsListComponent;
