import {createBottomTabNavigator} from 'react-navigation-tabs';
import StyleDict from '../AppStyles';
import CandiCrushConfig from '../CandiCrushConfig';
import {tabBarBuilder} from '../Core/ui';

import {InnerFeedNavigator} from './InnerStackNavigators';

const BottomTabNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: InnerFeedNavigator,
    },
  },
  {
    initialRouteName: 'Feed',
    tabBarComponent: tabBarBuilder(CandiCrushConfig.tabIcons, StyleDict),
    navigationOptions: ({navigation}) => {
      const {routeName} = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
        header: null,
      };
    },
  },
);

export default BottomTabNavigator;
