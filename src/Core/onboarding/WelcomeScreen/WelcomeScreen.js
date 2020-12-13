import React from 'react';
import {Text, View, Image} from 'react-native';
import Button from 'react-native-button';
import {useColorScheme} from 'react-native-appearance';
import {Localized} from '../../localization/Localization';
import dynamicStyles from './styles';

const WelcomeScreen = (props) => {
  const {navigation} = props;
  const appStyles =
    navigation.state.params.appStyles || navigation.getParam('appStyles');
  const appConfig =
    navigation.state.params.appConfig || navigation.getParam('appConfig');
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={appStyles.iconSet.logo} style={styles.logoImage} />
      </View>
      <Text style={styles.title}>
        {appConfig.onboardingConfig.welcomeTitle}
      </Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => {
          appConfig.isSMSAuthEnabled
            ? navigation.navigate('Sms', {
                isSigningUp: false,
                appStyles,
                appConfig,
              })
            : navigation.navigate('Login', {appStyles, appConfig});
        }}>
        {Localized('Log In')}
      </Button>
      <Button
        containerStyle={styles.signupContainer}
        style={styles.signupText}
        onPress={() => {
          appConfig.isSMSAuthEnabled
            ? navigation.navigate('Sms', {
                isSigningUp: true,
                appStyles,
                appConfig,
              })
            : navigation.navigate('Signup', {appStyles, appConfig});
        }}>
        {Localized('Sign Up')}
      </Button>
    </View>
  );
};

export default WelcomeScreen;
