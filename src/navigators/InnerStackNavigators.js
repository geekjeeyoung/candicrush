import {createStackNavigator} from 'react-navigation-stack';
import {FeedScreen} from '../screens';

const InnerFeedNavigator = createStackNavigator(
  {
    Feed: {screen: FeedScreen},
  },
  {
    initialRouteName: 'Feed',
    headerMode: 'float',
  },
);

export {InnerFeedNavigator};
