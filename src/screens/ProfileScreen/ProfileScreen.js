import React, {Component} from 'react';
import {Platform, Text, View} from 'react-native';
import StyleDict from '../../AppStyles';
import {Profile} from '../../components';
import {TNTouchableIcon} from '../../Core/truly-native';

class ProfileScreen extends Component {
  static navigationOptions = ({screenProps, navigation}) => {
    let currentTheme = StyleDict.navThemeConstants[screenProps.theme];
    const {params = {}} = navigation.state;
    return {
      headerTitle:
        Platform.OS === 'ios' ? (
          'Profile'
        ) : (
          <View style={{alignItems: 'center', flex: 1}}>
            <Text
              style={{
                fontSize: 18,
                color: currentTheme.fontColor,
              }}>
              Profile
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

export default ProfileScreen;
