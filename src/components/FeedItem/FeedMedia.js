import React, {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';

export default function FeedMedia({
  index,
  onMediaPress,
  media,
  item,
  mediaStyle,
  mediaContainerStyle,
  dynamicStyles,

  postMediaIndex,
  inViewPort,
  willBlur,
  onMediaResize,
  mediaCellcontainerStyle,
  videoResizeMode,
}) {
  const isValidUrl = media.url && media.url.startsWith('http');
  const uri = isValidUrl ? media.url : '';

  const [videoLoading, setVideoLoading] = useState(true);
  const [calcMediaWidth, setCalcMediaWidth] = useState('100%');
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [cachedImage, setCachedImage] = useState(uri);
  const [cachedVideo, setCachedVideo] = useState(null);
  const videoRef = useRef();

  const isImage = media && media.mime && media.mime.startsWith('image');
  const isVideo = media && media.mime && media.mime.startsWith('video');
  const noTypeStated = media && !media.mime;

  return (
    <View>
      <Text>FeedMedia</Text>
    </View>
  );
}

// const renderItem = ({item, index}) => {
//   return (
//     <FeedMedia
//       key={index + ''}
//       index={index}
//       onMediaPress={onPostPress}
//       media={item.postMedia && item.postMedia[0]}
//       item={item}
//       mediaStyle={styles.gridItemImage}
//       mediaContainerStyle={styles.gridItemContainer}
//       dynamicStyles={styles}
//     />
//   );
// };
