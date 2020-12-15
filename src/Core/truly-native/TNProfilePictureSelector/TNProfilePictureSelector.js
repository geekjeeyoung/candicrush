import React, {useRef, useState} from 'react';
import {
  Alert,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {useColorScheme} from 'react-native-appearance';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Localized} from '../../localization/Localization';
import dynamicStyles from './styles';

const TNProfilePictureSelector = (props) => {
  const {appStyles} = props;
  const [profilePictureURL, setProfilePictureURL] = useState(
    props.profilePictureURL || '',
  );
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const actionSheet = useRef(null);

  const handleProfilePictureClick = (url) => {
    Alert.alert(url);
  };

  const onImageError = () => {
    Alert.alert(
      '',
      Localized('An error occurred while trying to load Profile Picture!'),
      [{text: Localized('OK')}],
      {
        cancelable: false,
      },
    );
    setProfilePictureURL('');
  };

  const onPressAddPhotoBtn = () => {
    Alert.alert('on press add btn');
  };

  const onActionDone = (index) => {
    if (index === 0) {
      onPressAddPhotoBtn();
    }
    if (index === 2) {
      if (profilePictureURL) {
        setProfilePictureURL(null);
        props.setProfilePictureURL(null);
      }
    }
  };

  const showActionSheet = () => {
    actionSheet.current.show();
  };

  return (
    <>
      <View style={styles.imageBlock}>
        <TouchableHighlight
          style={styles.imageContainer}
          onPress={() => handleProfilePictureClick(profilePictureURL)}>
          <FastImage
            style={[styles.image, {opacity: profilePictureURL ? 1 : 0.3}]}
            source={
              profilePictureURL
                ? {uri: profilePictureURL}
                : appStyles.iconSet.userAvatar
            }
            resizeMode="cover"
            onError={onImageError}
          />
        </TouchableHighlight>
        <TouchableOpacity style={styles.addButton} onPress={showActionSheet}>
          <Icon name="camera" size={20} color="grey" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ActionSheet
          ref={actionSheet}
          title={Localized('Confirm action')}
          options={[
            Localized('Set Profile Photo'),
            Localized('Cancel'),
            Localized('Remove Profile Photo'),
          ]}
          cancelButtonIndex={1}
          destructiveButtonIndex={2}
          onPress={(index) => {
            onActionDone(index);
          }}
          useNativeDriver={true}
        />
      </ScrollView>
    </>
  );
};

export default TNProfilePictureSelector;
