import React, {useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {Alert} from 'react-native';
import {View, Text, FlatList} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {useColorScheme} from 'react-native-appearance';
import StyleDict from '../../../AppStyles';
import {Localized} from '../../../Core/localization/Localization';
import {TNEmptyStateView, TNStoryItem} from '../../../Core/truly-native';
import FeedMedia from '../../FeedItem/FeedMedia';
import ProfileButton from './ProfileButton';
import dynamicStyles from './styles';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';

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
    followingCount,
    followersCount,
    postsCount,
    mainButtonTitle,
    onMainButtonPress,
    onPostPress,
    handleOnEndReached,
    selectedMediaIndex,
    isMediaViewerOpen,
    feedItems,
    onMediaClose,
    removePhoto,
    startUpload,
    isFetching,
    onFollowersButtonPress,
    onFollowingButtonPress,
  } = props;

  const updatePhotoDialogActionSheet = useRef();
  const photoUploadDialogActionSheet = useRef();

  const onProfilePicturePress = () => {
    if (isOtherUser) {
      return;
    }
    updatePhotoDialogActionSheet.current.show();
  };

  const onUpdatePhotoDialogDone = (index) => {
    if (index === 0) {
      photoUploadDialogActionSheet.current.show();
    }
    if (index === 1) {
      removePhoto();
    }
  };

  const onPhotoUploadDialogDone = (index) => {
    if (index === 0) {
      onLaunchCamera();
    }

    if (index === 1) {
      onOpenPhotos();
    }
  };

  const onLaunchCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      return;
    }

    let {uri} = await ImagePicker.launchCameraAsync();

    if (uri) {
      startUpload(uri);
    }
  };

  const onOpenPhotos = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }

    let {uri} = await ImagePicker.launchImageLibraryAsync();

    if (uri) {
      startUpload(uri);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <FeedMedia
        key={index + ''}
        index={index}
        onMediaPress={onPostPress}
        media={item.postMedia && item.postMedia[0]}
        item={item}
        mediaStyle={styles.gridItemImage}
        mediaContainerStyle={styles.gridItemContainer}
      />
    );
  };

  const renderListFooter = () => {
    if (loading) {
      return null;
    }
    if (isFetching) {
      return <ActivityIndicator style={{marginVertical: 7}} size="small" />;
    }
    return null;
  };

  const renderListHeader = () => {
    return (
      <View style={styles.subContainer}>
        <View style={styles.userCardContainer}>
          <TNStoryItem
            item={user}
            imageStyle={styles.userImage}
            imageContainerStyle={styles.userImageContainer}
            containerStyle={styles.userImageMainContainer}
            appStyles={StyleDict}
            activeOpacity={1}
            onPress={onProfilePicturePress}
            textStyle={styles.userName}
            title={true}
          />
          <View style={styles.countItemsContainer}>
            <TouchableOpacity activeOpacity={0.7} style={styles.countContainer}>
              <Text style={styles.count}>{postsCount}</Text>
              <Text style={styles.countTitle}>
                {postsCount == 1 || postsCount == 0
                  ? Localized('Post')
                  : Localized('Posts')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.countContainer}
              onPress={onFollowersButtonPress}>
              <Text style={styles.count}>{followersCount}</Text>
              <Text style={styles.countTitle}>
                {followersCount == 1 || followersCount == 0
                  ? Localized('Follower')
                  : Localized('Followers')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.countContainer}
              onPress={onFollowingButtonPress}>
              <Text style={styles.count}>{followingCount}</Text>
              <Text style={styles.countTitle}>{Localized('Following')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ProfileButton
          title={mainButtonTitle}
          containerStyle={{marginVertical: 40}}
          onPress={onMainButtonPress}
        />
        {loading ? (
          <View style={styles.container}>
            <ActivityIndicator
              style={{marginTop: 15, alignSelf: 'center'}}
              size="small"
            />
          </View>
        ) : null}
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
      {recentUserFeeds && (
        <FlatList
          data={recentUserFeeds}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.5}
          onEndReached={handleOnEndReached}
          // numColumns={3}
          horizontal={false}
          ListEmptyComponent={renderEmptyComponent}
          ListHeaderComponent={renderListHeader}
          ListFooterComponent={renderListFooter}
          style={{width: '97%'}}
          showsVerticalScrollIndicator={true}
        />
      )}
      {/* TNMediaViewerModal 만들기 */}
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
      <ActionSheet
        ref={photoUploadDialogActionSheet}
        title={Localized('Select Photo')}
        options={[
          Localized('Camera'),
          Localized('Library'),
          Localized('Cancel'),
        ]}
        cancelButtonIndex={2}
        onPress={onPhotoUploadDialogDone}
      />
    </View>
  );
}

Profile.propTypes = {
  startUpload: PropTypes.func,
  removePhoto: PropTypes.func,
  onMainButtonPress: PropTypes.func,

  mainButtonTitle: PropTypes.string,

  feedItems: PropTypes.array,
  onMediaClose: PropTypes.func,
  isMediaViewerOpen: PropTypes.bool,
  onMediaPress: PropTypes.func,

  selectedMediaIndex: PropTypes.number,
  uploadProgress: PropTypes.number,
};

export default Profile;
