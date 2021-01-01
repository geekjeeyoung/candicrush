import React, {useRef, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import dynamicStyles from './styles';
import {Localized} from '../../../Core/localization/Localization';
import {Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {extractSourceFromFile} from '../../../Core/helpers/retrieveSource';
import PropTypes from 'prop-types';
import {KeyboardAvoidingView} from 'react-native';
import {TNStoryItem, TNTouchableIcon} from '../../../Core/truly-native';
import StyleDict from '../../../AppStyles';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';

const Image = createImageProgress(FastImage);

function CreatePost(props) {
  const {
    inputRef,
    user,
    onPostDidChange,
    onSetMedia,
    onLocationDidChange,
    blurInput,
  } = props;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const [address, setAddress] = useState('');
  const [locationSelectorVisible, setLocationSelectorVisible] = useState(false);
  const [media, setMedia] = useState([]);
  const [mediaSources, setMediaSources] = useState([]);
  const [value, setValue] = useState('');
  const [isCameraContainer, setIsCameraContainer] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const uploadPhotoDialogRef = useRef();
  const removePhotoDialogRef = useRef();

  const androidAddPhotoOptions = [
    Localized('Import from Library'),
    Localized('Take Photo'),
    Localized('Record Video'),
    Localized('Cancel'),
  ];

  const iosAddPhotoOptions = [
    Localized('Import from Library'),
    Localized('Open Camera'),
    Localized('Cancel'),
  ];

  const addPhotoCancelButtonIndex = {
    ios: 2,
    android: 3,
  };

  const addPhotoOptions =
    Platform.OS === 'android' ? androidAddPhotoOptions : iosAddPhotoOptions;

  const onLocationSelectorPress = () => {
    setLocationSelectorVisible(!locationSelectorVisible);
  };

  const onLocationSelectorDone = (_address) => {
    setLocationSelectorVisible(!locationSelectorVisible);
    setAddress(_address);
  };

  const onChangeLocation = (_address) => {
    setAddress(_address);
    onLocationDidChange(_address);
  };

  const onChangeText = (_value) => {
    const Post = {
      postText: _value,
      commentCount: 0,
      reactionsCount: 0,
      reactions: {
        surprised: 0,
        angry: 0,
        sad: 0,
        laugh: 0,
        like: 0,
        cry: 0,
        love: 0,
      },
    };

    setValue(_value);
    onPostDidChange(Post);
  };

  const onCameraIconPress = () => {
    uploadPhotoDialogRef.current.show();
  };

  const onPhotoUploadDialogDoneIOS = (index) => {
    if (index == 1) {
      onLaunchCamera();
    }
    if (index == 0) {
      onOpenPhotos();
    }
  };

  const onPhotoUploadDialogDoneAndroid = (index) => {
    if (index == 2) {
      onLaunchVideoCamera();
    }

    if (index == 1) {
      onLaunchCamera();
    }

    if (index == 0) {
      onOpenPhotos();
    }
  };

  const onPhotoUploadDialogDone = (index) => {
    const onPhotoUploadDialogDoneSetter = {
      ios: () => onPhotoUploadDialogDoneIOS(index),
      android: () => onPhotoUploadDialogDoneAndroid(index),
    };

    onPhotoUploadDialogDoneSetter[Platform.OS]();
  };

  const onLaunchCamera = () => {
    ImagePicker.openCamera({
      cropping: false,
    }).then((image) => {
      const {filename, source, uploadUri, mime} = extractSourceFromFile(image);
      setMedia([...media, {source, mime}]);
      setMediaSources([...mediaSources, {filename, uploadUri, mime}]);
      onSetMedia([...mediaSources, {filename, uploadUri, mime}]);
    });
  };

  const onOpenPhotos = () => {
    ImagePicker.openPicker({
      cropping: false,
      multiple: true,
    }).then((image) => {
      const newPhotos = [];
      const sources = image.map((img) => {
        const {filename, source, uploadUri, mime} = extractSourceFromFile(img);
        newPhotos.push({source, mime});
        return {filename, uploadUri, mime};
      });
      setMedia([...media, ...newPhotos]);
      setMediaSources([...mediaSources, ...sources]);
      onSetMedia([...mediaSources, ...sources]);
    });
  };

  const onRemovePhotoDialogDone = (index) => {
    if (index === 0) {
      removePhoto();
    } else {
      setSelectedIndex(null);
    }
  };

  const onMediaPress = async (index) => {
    await setSelectedIndex(index);
    removePhotoDialogRef.current.show();
  };

  const removePhoto = async () => {
    const slicedMedia = [...media];
    const slicedMediaSources = [...mediaSources];
    await slicedMedia.splice(selectedIndex, 1);
    await slicedMediaSources.splice(selectedIndex, 1);
    setMedia([...slicedMedia]);
    setMediaSources([...slicedMediaSources]);
    onSetMedia([...slicedMediaSources]);
  };

  const onTextFocus = () => {
    // setIsCameraContainer(false);
  };

  const onToggleImagesContainer = () => {
    blurInput();
    toggleImagesContainer();
  };

  const toggleImagesContainer = () => {
    setIsCameraContainer(!isCameraContainer);
  };

  const onStoryItemPress = (item) => {
    console.log('onStoryItemPress');
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      enabled={false}
      style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerContainer}>
          <TNStoryItem
            onPress={onStoryItemPress}
            item={user}
            appStyles={StyleDict}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{user.firstName}</Text>
            <Text style={styles.subtitle}>{address}</Text>
          </View>
        </View>
        <View style={styles.postInputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.postInput}
            onChangeText={onChangeText}
            value={value}
            multiline={true}
            onFocus={onTextFocus}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.postImageAndLocationContainer}>
          <ScrollView>
            {media.map((singleMedia, index) => {
              const {source, mime} = singleMedia;
              if (mime.startsWith('image')) {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => onMediaPress(index)}
                  />
                );
              }
            })}
          </ScrollView>
          <View style={styles.addTitleAndlocationIconContainer}>
            <View style={styles.addTitleContainer}>
              <Text style={styles.addTitle}>
                {!isCameraContainer
                  ? Localized('Add to your post')
                  : Localized('Add photo to your post')}
              </Text>
            </View>
            <View style={styles.iconsContainer}>
              <TNTouchableIcon
                onPress={onToggleImagesContainer}
                containerStyle={styles.iconContainer}
                imageStyle={[
                  styles.icon,
                  isCameraContainer
                    ? styles.cameraFocusTintColor
                    : styles.cameraUnfocusTintColor,
                ]}
                iconSource={StyleDict.iconSet.cameraFilled}
                appStyles={StyleDict}
              />
              <TNTouchableIcon
                containerStyle={styles.iconContainer}
                imageStyle={[styles.icon, styles.pinpointTintColor]}
                iconSource={StyleDict.iconSet.pinpoint}
                onPress={onLocationSelectorPress}
                appStyles={StyleDict}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.blankBottom} />
    </KeyboardAvoidingView>
  );
}

CreatePost.propTypes = {
  user: PropTypes.object,
  onPostDidChange: PropTypes.func,
  onSetMedia: PropTypes.func,
  onLocationDidChange: PropTypes.func,
  blurInput: PropTypes.func,
  inputRef: PropTypes.any,
};

export default CreatePost;
