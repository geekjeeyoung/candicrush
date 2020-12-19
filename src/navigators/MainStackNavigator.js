import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import BottomTabNavigator from './BottomTabNavigator';
import DrawerNavigator from './DrawerNavigator';

const MainStackNavigator = createStackNavigator(
  {
    NavStack: {
      screen: Platform.OS === 'ios' ? BottomTabNavigator : DrawerNavigator,
    },
  },
  {
    initialRouteName: 'NavStack',
    headerMode: 'float',
  },
);

export default MainStackNavigator;
