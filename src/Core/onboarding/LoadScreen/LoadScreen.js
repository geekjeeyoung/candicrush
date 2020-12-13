import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import authDeviceStorage from '../utils/AuthDeviceStorage';

const LoadScreen = (props) => {
  const {navigation} = props;
  const appStyles =
    navigation.state.params.appStyles || navigation.getParam('appStyles');
  const appConfig =
    navigation.state.params.appConfig || navigation.getParam('appConfig');

  useEffect(() => {
    setAppState();
  }, []);

  const setAppState = async () => {
    const shouldShowOnboardingFlow = await authDeviceStorage.getShouldShowOnboardingFlow();
    if (shouldShowOnboardingFlow) {
      navigation.navigate('Walkthrough', {
        appStyles,
        appConfig,
      });
    } else {
      navigation.navigate('LoginStack', {
        appStyles,
        appConfig,
      });
    }
  };

  return <View />;
};

LoadScreen.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object, // Will set it later
};

LoadScreen.navigationOptions = {
  header: null,
};

export default LoadScreen;
