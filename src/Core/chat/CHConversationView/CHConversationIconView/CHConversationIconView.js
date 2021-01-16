import React, {memo, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import FastImage from 'react-native-fast-image';
import {loadCachedItem} from '../../../helpers/cacheManager';
import dynamicStyles from './styles';
import PropTypes from 'prop-types';

const Image = FastImage;

const defaultAvatar =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg';

const CHConversationIconView = (props) => {
  const {participants, style, imageStyle, appStyles} = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const [imgErr, setImgErr] = useState(false);
  const [secondImgErr, setSecondImgErr] = useState(false);

  let firstUri =
    participants.length > 0 &&
    participants[0].profilePictureURL &&
    participants[0].profilePictureURL.length > 0
      ? participants[0].profilePictureURL
      : defaultAvatar;

  let secondUri =
    participants.length > 1 &&
    participants[1].profilePictureURL &&
    participants[1].profilePictureURL.length > 0
      ? participants[1].profilePictureURL
      : defaultAvatar;

  const [firstAvatarUri, setFirstAvatarUri] = useState(firstUri);
  const [secondAvatarUri, setSecondAvatarUri] = useState(secondUri);

  useEffect(() => {
    const loadImage = async () => {
      const firstImage = await loadCachedItem({uri: firstUri});
      const secondImage = await loadCachedItem({uri: secondUri});
      setFirstAvatarUri(firstImage);
      setSecondAvatarUri(secondImage);
    };

    loadImage();
  }, [firstUri, secondUri]);

  const onImageError = () => {
    setImgErr(true);
  };

  const onSecondImageError = () => {
    setSecondImgErr(true);
  };

  return (
    <View style={styles.container}>
      {participants.length == 0 && (
        <View style={styles.singleParticipation}>
          <Image
            style={styles.singleChatItemIcon}
            source={{uri: defaultAvatar}}
          />
        </View>
      )}
      {participants.length === 1 && (
        <View style={style ? style : styles.singleParticipation}>
          <Image
            style={[styles.singleChatItemIcon, imageStyle]}
            onError={onImageError}
            source={imgErr ? {uri: defaultAvatar} : {uri: firstAvatarUri}}
          />
          {participants[0].isOnline && <View style={styles.onlineMark} />}
        </View>
      )}
      {/* Bookmark for participants.length>1 */}
    </View>
  );
};

CHConversationIconView.propTypes = {
  participants: PropTypes.array,
  style: PropTypes.object,
  imageStyle: PropTypes.object,
};

export default memo(CHConversationIconView);
