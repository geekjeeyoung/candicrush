import React, {Component} from 'react';
import {BackHandler, Platform, Text, View} from 'react-native';
import {connect} from 'react-redux';
import StyleDict from '../../AppStyles';
import {Profile} from '../../components';
import {Localized} from '../../Core/localization/Localization';
import {TNTouchableIcon} from '../../Core/truly-native';
import {setUserData} from '../../Core/onboarding/redux/auth';
import {FriendshipConstants} from '../../Core/socialgraph/friendships';

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
      headerRight: !params.otherUser && (
        <TNTouchableIcon
          imageStyle={{tintColor: currentTheme.activeTintColor}}
          iconSource={StyleDict.iconSet.bell}
          onPress={params.navigateNotifi}
          appStyles={StyleDict}
        />
      ),
      headerLeft: Platform.OS === 'android' && (
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
      uploadProgress: 50,
      profilePosts: null,
      isMediaViewerOpen: false,
      selectedFeedItems: [],
      loading: true,
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
    }
  }

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

  render() {
    return (
      <Profile
        uploadProgress={this.state.uploadProgress}
        recentUserFeeds={this.state.profilePosts}
        loading={this.state.loading}
        user={this.otherUser ? this.otherUser : this.props.user}
        isOtherUser={this.otherUser}
        onEmptyStatePress={this.onEmptyStatePress}
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
