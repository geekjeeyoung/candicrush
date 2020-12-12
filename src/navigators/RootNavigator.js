import {createSwitchNavigator} from 'react-navigation';

export const RootNavigator = createSwitchNavigator(
  {
    LoadScreen: LoadScreen,
    // Walkthrough: WalkthroughScreen,
    // LoginStack: LoginStack,
  },
  {
    initialRouteName: 'LoadScreen',
    // initialRouteParams: {
    //   appStyle: AppStyles,
    //   appConfig: CandiCrushConfig,
    // },
  },
);

export default RootNavigator;
