import {createSwitchNavigator} from 'react-navigation';
import StyleDict from '../AppStyles';
import CandiCrushConfig from '../CandiCrushConfig';
import {LoadScreen, WalkthroughScreen} from '../Core/onboarding';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';

export const RootNavigator = createSwitchNavigator(
  {
    LoadScreen: LoadScreen,
    Walkthrough: WalkthroughScreen,
    LoginStack: AuthStackNavigator,
    MainStack: MainStackNavigator,
  },
  {
    initialRouteName: 'LoadScreen',
    initialRouteParams: {
      appStyles: StyleDict,
      appConfig: CandiCrushConfig,
    },
  },
);

export default RootNavigator;
