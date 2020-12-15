import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Image, StatusBar, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useColorScheme} from 'react-native-appearance';
import {Localized} from '../../localization/Localization';
import authDeviceStorage from '../utils/AuthDeviceStorage';
import dynamicStyles from './styles';

const WalkthroughScreen = (props) => {
  const {navigation} = props;
  const appStyles =
    navigation.state.params.appStyles || navigation.getParam('appStyles');
  const appConfig =
    navigation.state.params.appConfig || navigation.getParam('appConfig');
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const slides = appConfig.onboardingConfig.walkthroughScreens;

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const onDone = () => {
    authDeviceStorage.setShouldShowOnboardingFlow('false');
    navigation.navigate('Welcome');
  };

  const renderItem = ({item, dimensions}) => {
    return (
      <View
        style={[
          styles.container,
          dimensions,
          {backgroundColor: item.backgroundColor},
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.description}</Text>
      </View>
    );
  };

  const renderNextButton = () => {
    return <Text style={styles.button}>{Localized('NEXT')}</Text>;
  };
  const renderSkipButton = () => {
    return <Text style={styles.button}>{Localized('SKIP')}</Text>;
  };
  const renderDoneButton = () => {
    return <Text style={styles.button}>{Localized('DONE')}</Text>;
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      onDone={onDone}
      showSkipButton={true}
      onSkip={onDone}
      renderNextButton={renderNextButton}
      renderSkipButton={renderSkipButton}
      renderDoneButton={renderDoneButton}
    />
  );
};

WalkthroughScreen.propTypes = {
  navigation: PropTypes.object,
};

WalkthroughScreen.navigationOptions = {
  headerShown: false,
};

export default WalkthroughScreen;
