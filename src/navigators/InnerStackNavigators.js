import {createStackNavigator} from 'react-navigation-stack';
import {
  ConversationsScreen,
  ExploreScreen,
  FeedScreen,
  ProfileScreen,
} from '../screens';
import {CHFriendsScreen} from '../Core/socialgraph/friendships';

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
