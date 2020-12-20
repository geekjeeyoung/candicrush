import React, {useEffect, useState} from 'react';
import {Text, View, Image} from 'react-native';
import Button from 'react-native-button';
import {useColorScheme} from 'react-native-appearance';
import {Localized} from '../../localization/Localization';
import dynamicStyles from './styles';
import {connect} from 'react-redux';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import authManager from '../utils/authManager';
import {setUserData} from '../redux/auth';
import authDeviceStorage from '../utils/AuthDeviceStorage';

const WelcomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {navigation} = props;
  const appStyles =
    navigation.state.params.appStyles || navigation.getParam('appStyles');
  const appConfig =
    navigation.state.params.appConfig || navigation.getParam('appConfig');
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  useEffect(() => {
    tryToLoginFirst();
    // showOnboardingFlow();
  }, []);

  const showOnboardingFlow = () => {
    authDeviceStorage.setShouldShowOnboardingFlow(
      'SHOULD_SHOW_ONBOARDING_FLOW',
      true,
    );
  };

  const tryToLoginFirst = () => {
    authManager
      .retrievePersistedAuthUser()
      .then((response) => {
        if (response.user) {
          setIsLoading(true);
          const user = response.user;
          props.setUserData({
            user: user,
          });
          navigation.navigate('MainStack', {user: user});
        }
        return;
      })
      .catch(() => {
        return;
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={appStyles.iconSet.logo} style={styles.logoImage} />
      </View>

      <Text style={styles.title}>
        {appConfig.onboardingConfig.welcomeTitle}
      </Text>
      <Text style={styles.caption}>
        {appConfig.onboardingConfig.welcomeCaption}
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
      {isLoading && <TNActivityIndicator />}
    </View>
  );
};

export default connect(null, {setUserData})(WelcomeScreen);
