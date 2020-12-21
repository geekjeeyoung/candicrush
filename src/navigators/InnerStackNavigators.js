import {createStackNavigator} from 'react-navigation-stack';
import {
  ConversationsScreen,
  DetailPostScreen,
  ExploreScreen,
  FeedScreen,
  ProfileScreen,
} from '../screens';
import {
  CHAllFriendsScreen,
  CHFriendsScreen,
} from '../Core/socialgraph/friendships';
import {CHNotificationScreen} from '../Core/notifications';
import {
  CHContactUsScreen,
  CHEditProfileScreen,
  CHProfileSettingsScreen,
  CHUserSettingsScreen,
} from '../Core/profile';

const InnerFeedNavigator = createStackNavigator(
  {
    Feed: {screen: FeedScreen},
  },
  {
    initialRouteName: 'Feed',
    headerMode: 'float',
  },
);

const InnerDiscoverNavigator = createStackNavigator(
  {
    Discover: {screen: ExploreScreen},
  },
  {
    initialRouteName: 'Discover',
    headerMode: 'float',
  },
);

const InnerChatNavigator = createStackNavigator(
  {
    Chat: {screen: ConversationsScreen},
  },
  {
    initialRouteName: 'Chat',
    headerMode: 'float',
  },
);

const InnerFriendsNavigator = createStackNavigator(
  {
    Friends: {screen: CHFriendsScreen},
    FriendsProfile: {screen: ProfileScreen},
  },
  {
    initialRouteName: 'Friends',
    headerMode: 'float',
  },
);

const InnerProfileNavigator = createStackNavigator(
  {
    Profile: {screen: ProfileScreen},
    ProfileNotification: {screen: CHNotificationScreen},
    ProfileProfileSettings: {screen: CHProfileSettingsScreen},
    ProfileEditProfile: {screen: CHEditProfileScreen},
    ProfileAppSettings: {screen: CHUserSettingsScreen},
    ProfileContactUs: {screen: CHContactUsScreen},
    ProfileAllFriends: {screen: CHAllFriendsScreen},
    ProfilePostDetails: {screen: DetailPostScreen},
    ProfileDetailPostProfile: {screen: ProfileScreen},
  },
  {
    initialRouteName: 'Profile',
    headerMode: 'float',
  },
);

export {
  InnerFeedNavigator,
  InnerDiscoverNavigator,
  InnerChatNavigator,
  InnerFriendsNavigator,
  InnerProfileNavigator,
};
