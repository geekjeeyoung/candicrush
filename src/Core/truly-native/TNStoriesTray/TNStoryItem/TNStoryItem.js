import React, {useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import FastImage from 'react-native-fast-image';
import dynamicStyles from './styles';
import PropTypes from 'prop-types';

const defaultAvatar =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg';

function StoryItem(props) {
  const {
    item,
    index,
    onPress,
    containerStyle,
    imageStyle,
    imageContainerStyle,
    textStyle,
    activeOpacity,
    title,
    appStyles,
    showOnlineIndicator,
  } = props;

  const refs = useRef();
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const lastName = item.lastName || '';

  return (
    <TouchableOpacity
      key={index}
      ref={refs}
      activeOpacity={activeOpacity}
      onPress={() => onPress(item, index, refs)}
      style={[styles.container, containerStyle]}>
      <View style={[styles.imageContainer, imageContainerStyle]}>
        <FastImage
          style={[styles.image, imageStyle]}
          source={{uri: item.profilePictureURL || defaultAvatar}}
        />
        {showOnlineIndicator && <View style={styles.isOnlineIndicator} />}
      </View>
      {title && (
        <Text
          style={[
            styles.text,
            textStyle,
          ]}>{`${item.firstName} ${lastName}`}</Text>
      )}
    </TouchableOpacity>
  );
}

StoryItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  onPress: PropTypes.func,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  imageContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  activeOpacity: PropTypes.number,
  title: PropTypes.bool,
  appStyles: PropTypes.object,
  showOnlineIndicator: PropTypes.bool,
};

export default StoryItem;
