import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Image, StatusBar, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useColorScheme} from 'react-native-appearance';
import {Localized} from '../../localization/Localization';
import authDeviceStorage from '../utils/AuthDeviceStorage';
import dynamicStyles from './styles';

const WalkthroughScreen = (props) => {
  const slides = [
    {
      key: 's1',
      description: Localized(
        'Have fun with your friends by posting cool photos and videos.',
      ),
      title: Localized('Share Photos & Videos'),
      image: require('../../../../assets/images/instagram.png'),
      backgroundColor: '#F19F60',
    },
    {
      key: 's2',
      title: Localized('Stories'),
      description: Localized('Share stories that disappear after 24h.'),
      image: require('../../../../assets/images/photo.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 's3',
      title: Localized('Messages'),
      description: Localized(
        'Communicate with your friends via private messages.',
      ),
      image: require('../../../../assets/images/chat.png'),
      backgroundColor: '#22bcb5',
    },
    {
      key: 's4',
      title: Localized('Group Chats'),
      description: Localized(
        'Stay in touch with your friends in private group chats.',
      ),
      image: require('../../../../assets/icons/friends-unfilled.png'),
      backgroundColor: '#3395ff',
    },
    {
      key: 's5',
      title: Localized('Checkins'),
      description: Localized(
        'Check in when posting to share your location with friends.',
      ),
      image: require('../../../../assets/images/pin.png'),
      backgroundColor: '#f6437b',
    },
    {
      key: 's6',
      title: Localized('Get Notified'),
      description: Localized(
        'Receive notifications when you get new messages and likes.',
      ),
      image: require('../../../../assets/images/notification.png'),
      backgroundColor: '#F5C096',
    },
  ];

  const {navigation} = props;
  const appStyles =
    navigation.state.params.appStyles || navigation.getParam('appStyles');
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

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
  header: null,
};

export default WalkthroughScreen;
