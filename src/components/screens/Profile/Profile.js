import React, {useRef} from 'react';
import {Alert} from 'react-native';
import {View, Text, FlatList} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {useColorScheme} from 'react-native-appearance';
import StyleDict from '../../../AppStyles';
import {Localized} from '../../../Core/localization/Localization';
import {TNEmptyStateView, TNStoryItem} from '../../../Core/truly-native';
import dynamicStyles from './styles';

function Profile(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const {
    uploadProgress,
    recentUserFeeds,
    loading,
    user,
    isOtherUser,
    onEmptyStatePress,
  } = props;

  const updatePhotoDialogActionSheet = useRef();

  const onProfilePicturePress = () => {
    if (isOtherUser) {
      return;
    }
    updatePhotoDialogActionSheet.current.show();
  };

  const onUpdatePhotoDialogDone = () => {
    Alert.alert('onUpdatePhotoDialogDone');
  };

  const renderListHeader = () => {
    return (
      <View style={styles.subContainer}>
        <View style={styles.userCardContainer}>
          <TNStoryItem
            item={user}
            appStyles={StyleDict}
            activeOpacity={1}
            onPress={onProfilePicturePress}
            imageStyle={styles.userImage}
            imageContainerStyle={styles.userImageContainer}
            containerStyle={styles.userImageMainContainer}
            title={true}
            textStyle={styles.userName}
          />
        </View>
      </View>
    );
  };

  const renderEmptyComponent = () => {
    let emptyStateConfig = {
      title: Localized('No Posts'),
      description: Localized(
        'There are currently no posts on this profile. All the posts will show up here.',
      ),
    };
    if (!isOtherUser) {
      emptyStateConfig = {
        ...emptyStateConfig,
        buttonName: Localized('Add Your First Post'),
        onPress: onEmptyStatePress,
      };
    }
    return (
      <View style={styles.emptyViewContainer}>
        <TNEmptyStateView
          emptyStateConfig={emptyStateConfig}
          appStyles={StyleDict}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, {width: `${uploadProgress}%`}]} />
      {/* {recentUserFeeds && ( */}
      <FlatList
        ListEmptyComponent={renderEmptyComponent}
        ListHeaderComponent={renderListHeader}
      />
      {/* )} */}

      <ActionSheet
        ref={updatePhotoDialogActionSheet}
        title={Localized('Profile Picture')}
        options={[
          Localized('Change Photo'),
          Localized('Remove'),
          Localized('Cancel'),
        ]}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={onUpdatePhotoDialogDone}
      />
    </View>
  );
}

export default Profile;
