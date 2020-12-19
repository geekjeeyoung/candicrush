import {createDrawerNavigator} from 'react-navigation-drawer';
import {InnerFeedNavigator} from './InnerStackNavigators';

const DrawerNavigator = createDrawerNavigator(
  {
    Feed: {screen: InnerFeedNavigator},
  },
  {drawerPosition: 'left', initialRouteName: 'Feed', drawerWidth: 300},
);

export default DrawerNavigator;
