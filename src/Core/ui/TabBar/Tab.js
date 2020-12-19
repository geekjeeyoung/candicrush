import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import dynamicStyles from './styles';

function Tab(props) {
  const {route, tabIcons, appStyles, focus, onPress} = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  return (
    <TouchableOpacity style={styles.tabContainer} onPress={onPress}>
      <Image
        source={
          focus
            ? tabIcons[route.routeName].focus
            : tabIcons[route.routeName].unFocus
        }
        style={[
          styles.tabIcon,
          focus ? styles.focusTintColor : styles.unFocusTintColor,
        ]}
      />
    </TouchableOpacity>
  );
}

export default Tab;
