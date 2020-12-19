import PropTypes from 'prop-types';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import dynamicStyles from './styles';

function DrawerItem(props) {
  const {title, source, onPress} = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  return (
    <TouchableOpacity onPress={onPress} style={styles.btnClickContain}>
      <View style={styles.btnContainer}>
        <Image source={source} style={styles.btnIcon} />
        <Text style={styles.btnText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

DrawerItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  source: PropTypes.any,
  title: PropTypes.string.isRequired,
};

export default DrawerItem;
