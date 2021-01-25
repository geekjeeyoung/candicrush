import React, {Component} from 'react';
import {BackHandler, Platform, Text, View} from 'react-native';
import {connect} from 'react-redux';
import StyleDict from '../../AppStyles';
import {Profile} from '../../components';
import {Localized} from '../../Core/localization/Localization';
import {TNTouchableIcon} from '../../Core/truly-native';
import {setUserData} from '../../Core/onboarding/redux/auth';
import {FriendshipConstants} from '../../Core/socialgraph/friendships';
import {firebasePost} from '../../Core/socialgraph/feed/firebase';
import {firebaseStorage, firebaseUser} from '../../Core/firebase';
import CandiCrushConfig from '../../CandiCrushConfig';
import * as firebaseFriendship from '../../Core/socialgraph/friendships/firebase/friendship';
import {Alert} from 'react-native';

const defaultAvatar =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg';

class ProfileScreen extends Component {
  static navigationOptions = ({screenProps, navigation}) => {
    let currentTheme = StyleDict.navThemeConstants[screenProps.theme];
    const {params = {}} = navigation.state;
    return {
      headerTitle:
        Platform.OS === 'ios' ? (
          Localized('Profile')
        ) : (
          <View style={{alignItems: 'center', flex: 1}}>
            <Text
              style={{
                fontSize: 18,
                // color: currentTheme.fontColor,
              }}>
              {Localized('Profile')}
            </Text>
          </View>
        ),
      headerRight: () =>
        !params.otherUser && (
          <TNTouchableIcon
            imageStyle={{tintColor: currentTheme.activeTintColor}}
            iconSource={StyleDict.iconSet.bell}
            onPress={params.navigateNotifi}
            appStyles={StyleDict}
          />
        ),
      headerLeft: () =>
        Platform.OS === 'android' && (
          <TNTouchableIcon
            imageStyle={{tintColor: currentTheme.activeTintColor}}
            iconSource={StyleDict.iconSet.menuHamburger}
            onPress={params.openDrawer}
            appStyles={StyleDict}
          />
        ),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomColor: currentTheme.hairlineColor,
      },
      headerTintColor: currentTheme.fontColor,
    };
  };

  constructor(props) {
    super(props);
    this.otherUser = props.navigation.getParam('user');
    // if it is not one's own profile screen and if the user didn't send friend request yet
    const shouldAddFriend = this.otherUser
      ? !props.friendships.find(
          (friendship) =>
            friendship.user.id == this.otherUser.id &&
            friendship.type != FriendshipConstants.FriendshipType.inbound,
        )
      : false;

    this.state = {
      isCameraOpen: false,
      uploadProgress: 0,
      profilePosts: [],
      isMediaViewerOpen: false,
      selectedFeedItems: [],
      loading: true,
      userFeed: [],
      shouldAddFriend: shouldAddFriend,
      isFetching: false,
      selectedMediaIndex: null,
    };

    this.isFetching = false;
    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      (payload) => {
        this.willBlur = false;
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        );
      },
    );

    this.willBlur = false;
    // this.lastVisibleFeed = null;
    // this.feedBatchLimit = 15;
    this.fetchCallCount = 0;
    this.stackKeyTitle = 'Profile';
    const keyTitle = props.navigation.getParam('stackKeyTitle');
    if (keyTitle) {
      this.stackKeyTitle = keyTitle;
    }
    this.ProfileSettingsTitle = 'ProfileProfileSettings';
    this.lastScreenTitle = props.navigation.getParam('lastScreenTitle');
    if (this.lastScreenTitle) {
      this.ProfileSettingsTitle = this.lastScreenTitle + 'ProfileSettings';
    } else {
      this.lastScreenTitle = 'Profile';
    }
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      (payload) => {
        this.willBlur = true;
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        );
      },
    );

    this.props.navigation.setParams({
      navigateNotifi: this.navigateNotifi,
      openDrawer: this.openDrawer,
      otherUser: this.otherUser,
    });

    // if this screen is other person's profile screen
    if (this.otherUser && this.otherUser.id != this.props.user.id) {
      let profileUserID = this.otherUser.id;
      this.currentProfileFeedUnsubscribe = firebasePost.subscribeToProfileFeedPosts(
        profileUserID,
        this.onProfileFeedUpdate,
      );
      this.currentUserUnsubscribe = firebaseUser.subscribeCurrentUser(
        profileUserID,
        this.onCurrentUserUpdate,
      );
    } else {
      this.currentProfileFeedUnsubscribe = firebasePost.subscribeToProfileFeedPosts(
        this.props.user.id,
        this.onProfileFeedUpdate,
      );
      this.currentUserUnsubscribe = firebaseUser.subscribeCurrentUser(
        this.props.user.id,
        this.onCurrentUserUpdate,
      );
    }
  }

  componentWillUnmount() {
    this.willBlur = true;
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
    this.currentProfileFeedUnsubscribe && this.currentProfileFeedUnsubscribe();
    this.currentUserUnsubscribe && this.currentUserUnsubscribe();
  }

  onProfileFeedUpdate = (profilePosts) => {
    this.setState({
      profilePosts,
      loading: false,
    });
  };

  onCurrentUserUpdate = (user) => {
    this.setState({
      inboundFriendsCount: user.inboundFriendsCount || 0,
      outboundFriendsCount: user.outboundFriendsCount || 0,
    });
  };

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  navigateNotifi = () => {
    this.props.navigation.navigate(this.lastScreenTitle + 'Notification', {
      lastScreenTitle: this.lastScreenTitle,
      appStyles: StyleDict,
    });
  };

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  onEmptyStatePress = () => {
    this.props.navigation.navigate('CreatePost');
  };

  onPostPress = ({item, index}) => {
    this.props.navigation.navigate('ProfilePostDetails', {
      item: item,
      lastScreenTitle: this.lastScreenTitle,
    });
  };

  handleOnEndReached = (distanceFromEnd) => {
    if (this.state.isFetching || this.isFetching) {
      return;
    }
    if (this.fetchCallCount > 1) {
      return;
    }
  };

  onMainButtonPress = () => {
    if (this.state.shouldAddFriend) {
      this.onAddFriend();
      return;
    }
    if (this.otherUser) {
      this.onMessage();
      return;
    }
    this.props.navigation.navigate(this.ProfileSettingsTitle, {
      lastScreenTitle: this.lastScreenTitle, // Profile
      appStyles: StyleDict,
      appConfig: CandiCrushConfig,
    });
  };

  onMediaClose = () => {
    this.setState({isMediaViewerOpen: false});
  };

  startUpload = async (url) => {
    // this.props.setUserData({
    //   user: {...this.props.user, profilePictureURL: url},
    // });

    const filename = new Date() + '-' + url.substring(url.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? url.replace('file://', '') : url;

    firebaseStorage.uploadFileWithProgressTracking(
      filename,
      uploadUri,
      async (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({uploadProgress});
      },
      async (downloadURL) => {
        const data = {
          profilePictureURL: downloadURL,
        };
        this.props.setUserData({
          user: {...this.props.user, profilePictureURL: downloadURL},
        });

        firebaseUser.updateUserData(this.props.user.id, data);
        this.setState({uploadProgress: 0});
      },
      (error) => {
        this.setState({uploadProgress: 0});
        Alert.alert(
          Localized(
            'An error occured while trying to update your profile picture. Please try again.',
          ),
        );
        console.log(error);
      },
    );
  };

  removePhoto = async () => {
    const res = await firebaseUser.updateUserData(this.props.user.id, {
      profilePictureURL: defaultAvatar,
    });
    if (res.success) {
      this.props.setUserData({
        user: {...this.props.user, profilePictureURL: defaultAvatar},
      });
    } else {
      Alert.alert(
        'An error occured while trying to remove your profile picture. Please try again.',
      );
    }
  };

  onFollowersButtonPress = () => {
    this.props.navigation.push(this.lastScreenTitle + 'AllFriends', {
      lastScreenTitle: this.lastScreenTitle,
      title: Localized('Followers'),
      stackKeyTitle: this.stackKeyTitle,
      otherUser: this.otherUser,
      includeInbound: true,
      appStyles: StyleDict,
      followEnabled: true,
    });
  };

  onFollowingButtonPress = () => {
    this.props.navigation.push(this.lastScreenTitle + 'AllFriends', {
      // channels: this.props.channels,
      lastScreenTitle: this.lastScreenTitle,
      title: 'Following',
      stackKeyTitle: this.stackKeyTitle,
      otherUser: this.otherUser,
      includeOutbound: true,
      appStyles: StyleDict,
      followEnabled: true,
    });
  };

  // when the profile is other's profile & we aren't friends yet
  onAddFriend = () => {
    this.setState({shouldAddFriend: false});
    firebaseFriendship.addFriendRequest(
      this.props.user,
      this.otherUser,
      true,
      true,
      true,
      ({success, error}) => {
        if (error) {
          Alert.alert(error);
          this.setState({shouldAddFriend: true});
        }
      },
    );
  };

  //when the profile is my friend's profile
  onMessage = () => {
    Alert.alert('onMessage');
  };

  render() {
    let currentProfile = this.otherUser || this.props.user;
    let postsCount = currentProfile.postsCount || 0;
    let mainButtonTitle = Localized('Profile Settings');

    if (this.otherUser) {
      mainButtonTitle = Localized('Send Direct Message');
      if (this.state.shouldAddFriend) {
        mainButtonTitle = Localized('Follow');
      }
    }

    return (
      <Profile
        uploadProgress={this.state.uploadProgress}
        recentUserFeeds={this.state.profilePosts}
        loading={this.state.loading}
        user={this.otherUser ? this.otherUser : this.props.user}
        isOtherUser={this.otherUser}
        onEmptyStatePress={this.onEmptyStatePress}
        followingCount={this.state.outboundFriendsCount}
        followersCount={this.state.inboundFriendsCount}
        postsCount={postsCount}
        mainButtonTitle={mainButtonTitle}
        onMainButtonPress={this.onMainButtonPress}
        onPostPress={this.onPostPress}
        handleOnEndReached={this.handleOnEndReached}
        selectedMediaIndex={this.state.selectedMediaIndex}
        isMediaViewerOpen={this.state.isMediaViewerOpen}
        feedItems={this.state.selectedFeedItems}
        onMediaClose={this.onMediaClose}
        removePhoto={this.removePhoto}
        startUpload={this.startUpload}
        isFetching={this.state.isFetching}
        onFollowersButtonPress={this.onFollowersButtonPress}
        onFollowingButtonPress={this.onFollowingButtonPress}
      />
    );
  }
}

const mapStateToProps = ({auth, feed, friends}) => {
  return {
    currentUserFeedPosts: feed.currentUserFeedPosts,
    user: auth.user,
    friendships: friends.friendships,
    friends: friends.friends,
  };
};

export default connect(mapStateToProps, {setUserData})(ProfileScreen);
