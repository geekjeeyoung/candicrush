import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import dynamicStyles from './styles';

function TNTouchableIcon(props) {
  const {onPress, iconSource, imageStyle, appStyles} = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={iconSource} style={[styles.Image, imageStyle]} />
    </TouchableOpacity>
  );
}

export default TNTouchableIcon;
