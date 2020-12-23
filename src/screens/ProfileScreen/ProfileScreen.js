import React, {Component} from 'react';
import {Platform, Text, View} from 'react-native';
import {connect} from 'react-redux';
import StyleDict from '../../AppStyles';
import {Profile} from '../../components';
import {Localized} from '../../Core/localization/Localization';
import {TNTouchableIcon} from '../../Core/truly-native';
import {setUserData} from '../../Core/onboarding/redux/auth';
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
    this.otherUser = this.props.navigation.getParam('user');
    // const shouldAddFriend = this.otherUser? this.props.friendships.find()

    this.state = {
      uploadProgress: 50,
      profilePosts: null,
    };

    this.ProfileSettingsTitle = 'ProfileProfileSettings';
    this.lastScreenTitle = this.props.navigation.getParam('lastScreenTitle');
    if (this.lastScreenTitle) {
      this.ProfileSettingsTitle = this.lastScreenTitle + 'ProfileSettings';
    } else {
      this.lastScreenTitle = 'Profile';
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      navigateNotifi: this.navigateNotifi,
      openDrawer: this.openDrawer,
      otherUser: this.otherUser,
    });
  }

  navigateNotifi = () => {
    this.props.navigation.navigate(this.lastScreenTitle + 'Notification', {
      lastScreenTitle: this.lastScreenTitle,
      appStyles: StyleDict,
    });
  };

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <Profile
        uploadProgress={this.state.uploadProgress}
        recentUserFeeds={this.state.profilePosts}
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
