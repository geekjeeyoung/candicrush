import {createBottomTabNavigator} from 'react-navigation-tabs';
import {InnerFeedNavigator} from './InnerStackNavigators';

const BottomTabNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: InnerFeedNavigator,
    },
  },
  {
    initialRouteName: 'Feed',
  },
);

export default BottomTabNavigator;
