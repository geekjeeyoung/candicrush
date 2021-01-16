import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import dynamicStyles from './styles';

import Modal from 'react-native-modalbox';
import {SearchBar} from '../../../..';
import {CHFriendItem} from '../..';

function CHUserSearchModal(props) {
  const {
    onSearchBarCancel,
    onSearchClear,
    data,
    onSearchTextChange,
    isModalOpen,
    onClose,
    searchBarRef,
    onAddFriend,
    onFriendItemPress,
    appStyles,
    followEnabled,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const renderItem = ({item, index}) => (
    <CHFriendItem
      item={item}
      onFriendAction={() => onAddFriend(item, index)}
      onFriendItemPress={onFriendItemPress}
      appStyles={appStyles}
      followEnabled={followEnabled}
    />
  );

  return (
    <Modal
      style={styles.container}
      isOpen={isModalOpen}
      onClosed={onClose}
      position="center"
      keyboardTopOffset={0}
      swipeToClose={false}
      swipeArea={250}
      coverScreen={true}
      useNativeDriver={true}
      animationDuration={0}>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBar
            onChangeText={onSearchTextChange}
            onSearchBarCancel={onSearchBarCancel}
            searchRef={searchBarRef}
            appStyles={appStyles}
            onSearchClear={onSearchClear}
          />
        </View>
        <FlatList
          keyboardShouldPersistTaps="always"
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.user.id}
        />
      </View>
    </Modal>
  );
}

export default CHUserSearchModal;
