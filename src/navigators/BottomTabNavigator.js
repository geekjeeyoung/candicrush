import {createBottomTabNavigator} from 'react-navigation-tabs';
import StyleDict from '../AppStyles';
import CandiCrushConfig from '../CandiCrushConfig';
import {tabBarBuilder} from '../Core/ui';

import {
  InnerChatNavigator,
  InnerDiscoverNavigator,
  InnerFeedNavigator,
  InnerFriendsNavigator,
  InnerProfileNavigator,
} from './InnerStackNavigators';

const BottomTabNavigator = createBottomTabNavigator(
  {
    Feed: {screen: InnerFeedNavigator},
    Discover: {screen: InnerDiscoverNavigator},
    Chat: {screen: InnerChatNavigator},
    Friends: {screen: InnerFriendsNavigator},
    Profile: {screen: InnerProfileNavigator},
  },
  {
    initialRouteName: 'Feed',
    tabBarComponent: tabBarBuilder(CandiCrushConfig.tabIcons, StyleDict),
    navigationOptions: ({navigation}) => {
      const {routeName} = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
        headerShown: false,
      };
    },
  },
);

export default BottomTabNavigator;
