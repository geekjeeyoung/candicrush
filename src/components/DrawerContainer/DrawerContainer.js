import React from 'react';
import {View} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import {connect} from 'react-redux';
import StyleDict from '../../AppStyles';
import {Localized} from '../../Core/localization/Localization';
import authManager from '../../Core/onboarding/utils/authManager';
import DrawerItem from '../DrawerItem/DrawerItem';
import dynamicStyles from './styles';
import {logout} from '../../Core/onboarding/redux/auth';
import CandiCrushConfig from '../../CandiCrushConfig';

function DrawerContainer(props) {
  const {navigation} = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const onLogout = () => {
    authManager.logout(props.user);
    props.logout();
    navigation.navigate('LoadScreen', {
      appStyles: StyleDict,
      appConfig: CandiCrushConfig,
    });
  };

  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <DrawerItem
          title={Localized('Home')}
          source={StyleDict.iconSet.homeUnfilled}
          onPress={() => {
            navigation.navigate('Feed');
          }}
        />
        <DrawerItem
          title={Localized('Explore')}
          source={StyleDict.iconSet.search}
          onPress={() => {
            navigation.navigate('Discover');
          }}
        />
        <DrawerItem
          title={Localized('Direct Messages')}
          source={StyleDict.iconSet.commentUnfilled}
          onPress={() => {
            navigation.navigate('Chat');
          }}
        />
        <DrawerItem
          title={Localized('People')}
          source={StyleDict.iconSet.friendsUnfilled}
          onPress={() => {
            navigation.navigate('Friends');
          }}
        />
        <DrawerItem
          title={Localized('Profile')}
          source={StyleDict.iconSet.profileUnfilled}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <DrawerItem
          title={Localized('Logout')}
          source={StyleDict.iconSet.logout}
          onPress={onLogout}
        />
      </View>
    </View>
  );
}

const mapStateToProps = ({auth}) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, {logout})(DrawerContainer);
