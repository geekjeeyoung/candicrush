import React, {useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import {Alert} from 'react-native';
import {View, Text, FlatList} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {useColorScheme} from 'react-native-appearance';
import StyleDict from '../../../AppStyles';
import {Localized} from '../../../Core/localization/Localization';
import {TNEmptyStateView, TNStoryItem} from '../../../Core/truly-native';
import FeedMedia from '../../FeedItem/FeedMedia';
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
    followingCount,
    followersCount,
    postsCount,
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

  const renderItem = ({item, index}) => {
    return <FeedMedia />;
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
            <TouchableOpacity activeOpacity={0.7} style={styles.countContainer}>
              <Text style={styles.count}>{followersCount}</Text>
              <Text style={styles.countTitle}>
                {followersCount == 1 || followersCount == 0
                  ? Localized('Follower')
                  : Localized('Followers')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.countContainer}>
              <Text style={styles.count}>{followingCount}</Text>
              <Text style={styles.countTitle}>{Localized('Following')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* BookMark */}
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
          ListEmptyComponent={renderEmptyComponent}
          ListHeaderComponent={renderListHeader}
        />
      )}

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
