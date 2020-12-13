import {createStackNavigator} from 'react-navigation-stack';
import StyleDict from '../AppStyles';
import CandiCrushConfig from '../CandiCrushConfig';
import {StyleSheet} from 'react-native';
import {
  LoginScreen,
  SignupScreen,
  SmsAuthenticationScreen,
  WelcomeScreen,
} from '../Core/onboarding';

const AuthStackNavigator = createStackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: {header: null},
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: () => ({
        headerStyle: styles.headerStyle,
      }),
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        headerStyle: styles.headerStyle,
      }),
    },
    Sms: {
      screen: SmsAuthenticationScreen,
      navigationOptions: () => ({
        headerStyle: styles.headerStyle,
      }),
    },
  },
  {
    initialRouteName: 'Welcome',
    initialRouteParams: {
      appConfig: CandiCrushConfig,
      appStyles: StyleDict,
    },
    headerShown: false,
    headerBackTitleVisible: false,
    cardShadowEnabled: false,
  },
);

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default AuthStackNavigator;
