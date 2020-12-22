import PropTypes from 'prop-types';
import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import dynamicStyles from './styles';

export default function SearchBarAlternate(props) {
  const {onPress, appStyles, placeholderTitle} = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const searchIcon = require('../../../CoreAssets/search.png');

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={onPress}>
      <Image style={styles.searchIcon} source={searchIcon} />
      <Text style={styles.searchInput}>{placeholderTitle}</Text>
    </TouchableOpacity>
  );
}

SearchBarAlternate.propTypes = {
  onPress: PropTypes.func,
};
