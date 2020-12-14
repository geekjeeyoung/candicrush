import React from 'react';
import {useState} from 'react';
import {Image, View} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import dynamicStyles from './styles';

const TNProfilePictureSelector = (props) => {
  const {appStyles} = props;
  const [profilePictureURL, setProfilePictureURL] = useState(
    props.profilePictureURL || '',
  );
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  return (
    <>
      <View style={styles.imageBlock}>
        <TouchableHighlight style={styles.imageContainer}>
          <Image
            style={[styles.image, {opacity: profilePictureURL ? 1 : 0.3}]}
            source={
              profilePictureURL
                ? {uri: profilePictureURL}
                : appStyles.iconSet.userAvatar
            }
            resizeMode="cover"
          />
        </TouchableHighlight>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="camera" size={20} color="grey" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TNProfilePictureSelector;
