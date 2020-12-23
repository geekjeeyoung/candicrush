import {createStackNavigator} from 'react-navigation-stack';
import {
  ConversationsScreen,
  CreatePostScreen,
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
import {CHCreateGroupScreen} from '../Core/chat';
import StyleDict from '../AppStyles';
import CandiCrushConfig from '../CandiCrushConfig';
import {Localized} from '../Core/localization/Localization';
import {Platform} from 'react-native';

const InnerFeedNavigator = createStackNavigator(
  {
    Feed: {screen: FeedScreen},
    FeedDetailPost: {screen: DetailPostScreen},
    CreatePost: {screen: CreatePostScreen},
    FeedProfile: {screen: ProfileScreen},
    FeedNotification: {screen: CHNotificationScreen},
    FeedProfileSettings: {screen: CHProfileSettingsScreen},
    FeedEditProfile: {screen: CHEditProfileScreen},
    FeedAppSettings: {screen: CHUserSettingsScreen},
    FeedContactUs: {screen: CHContactUsScreen},
    FeedAllFriends: {screen: CHAllFriendsScreen},
  },
  {
    initialRouteName: 'Feed',
    headerMode: 'float',
  },
);

const InnerDiscoverNavigator = createStackNavigator(
  {
    Discover: {screen: ExploreScreen},
    DiscoverDetailPost: {screen: DetailPostScreen},
    DiscoverProfile: {screen: ProfileScreen},
    DiscoverNotification: {screen: CHNotificationScreen},
    DiscoverProfileSettings: {screen: CHProfileSettingsScreen},
    DiscoverEditProfile: {screen: CHEditProfileScreen},
    DiscoverAppSettings: {screen: CHUserSettingsScreen},
    DiscoverContactUs: {screen: CHContactUsScreen},
    DiscoverAllFriends: {screen: CHAllFriendsScreen},
  },
  {
    initialRouteName: 'Discover',
    headerMode: 'float',
  },
);

const InnerChatNavigator = createStackNavigator(
  {
    Chat: {screen: ConversationsScreen},
    CreateGroup: {screen: CHCreateGroupScreen},
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
    FriendsAllFriends: {screen: CHAllFriendsScreen},
  },
  {
    initialRouteName: 'Friends',
    initialRouteParams: {
      appStyles: StyleDict,
      appConfig: CandiCrushConfig,
      followEnabled: true,
      friendsScreenTitle: Localized('People'),
      showDrawerMenuButton: Platform.OS === 'android',
    },
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
