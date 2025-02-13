import {createDrawerNavigator} from 'react-navigation-drawer';
import {DrawerContainer} from '../components';
import {
  InnerChatNavigator,
  InnerDiscoverNavigator,
  InnerFeedNavigator,
  InnerFriendsNavigator,
  InnerProfileNavigator,
} from './InnerStackNavigators';

const DrawerNavigator = createDrawerNavigator(
  {
    Feed: {
      screen: InnerFeedNavigator,
    },
    Discover: {
      screen: InnerDiscoverNavigator,
    },
    Chat: {
      screen: InnerChatNavigator,
    },
    Friends: {
      screen: InnerFriendsNavigator,
    },
    Profile: {
      screen: InnerProfileNavigator,
    },
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Feed',
    drawerWidth: 300,
    contentComponent: DrawerContainer,
    headerMode: 'screen',
    navigationOptions: ({navigation}) => {
      const routeIndex = navigation.state.index;
      return {
        title: navigation.state.routes[routeIndex].key,
        headerShown: false,
      };
    },
  },
);

export default DrawerNavigator;
