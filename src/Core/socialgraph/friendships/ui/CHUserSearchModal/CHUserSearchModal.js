import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import dynamicStyles from './styles';

import Modal from 'react-native-modalbox';
import {SearchBar} from '../../../..';

function CHUserSearchModal(props) {
  const {
    onSearchBarCancel,
    isModalOpen,
    onClose,
    searchBarRef,
    appStyles,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

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
            onSearchBarCancel={onSearchBarCancel}
            searchRef={searchBarRef}
            appStyles={appStyles}
          />
        </View>
      </View>
    </Modal>
  );
}

export default CHUserSearchModal;
