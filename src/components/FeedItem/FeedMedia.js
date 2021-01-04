import React, {useEffect, useRef, useState} from 'react';
import Image from 'react-native-image-progress';
import CirCleSnail from 'react-native-progress/CircleSnail';
import {Dimensions, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {Surface, Shape} from '@react-native-community/art';

const circleSnailProps = {thickness: 2, color: '#D0D0D0', size: 25};
const {width} = Dimensions.get('window');

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

  if (isImage) {
    return (
      <View style={[mediaContainerStyle, mediaCellcontainerStyle]}>
        <TouchableOpacity
          style={mediaContainerStyle}
          activeOpacity={0.7}
          onPress={onMediaPress}>
          <Image
            style={mediaStyle}
            source={{
              uri: cachedImage,
            }}
            indicator={CirCleSnail}
            indicatorProps={circleSnailProps}
            onLoad={(evt) => {
              if (onMediaResize) {
                onMediaResize({
                  height:
                    (evt.nativeEvent.height / evt.nativeEvent.width) * width,
                });
              }
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
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
