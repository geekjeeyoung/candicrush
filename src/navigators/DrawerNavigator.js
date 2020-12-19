import {createDrawerNavigator} from 'react-navigation-drawer';
import {DrawerContainer} from '../components';
import {InnerFeedNavigator} from './InnerStackNavigators';

const DrawerNavigator = createDrawerNavigator(
  {
    Feed: {screen: InnerFeedNavigator},
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
        header: null,
      };
    },
  },
);

export default DrawerNavigator;
