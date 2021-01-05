import React, {useEffect, useRef, useState} from 'react';
import Image from 'react-native-image-progress';
import CirCleSnail from 'react-native-progress/CircleSnail';
import {Dimensions, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {Surface, Shape} from '@react-native-community/art';
import {Video} from 'expo-av';
import {loadCachedItem} from '../../Core/helpers/cacheManager';
import {useColorScheme} from 'react-native-appearance';
import dynamicStyles from './styles';
import {TNTouchableIcon} from '../../Core/truly-native';
import StyleDict from '../../AppStyles';

const circleSnailProps = {thickness: 2, color: '#D0D0D0', size: 25};
const {width} = Dimensions.get('window');

export default function FeedMedia({
  index,
  onMediaPress,
  media,
  item,
  mediaStyle,
  mediaContainerStyle,
  // dynamicStyles,

  postMediaIndex,
  inViewPort,
  willBlur,
  onMediaResize,
  mediaCellcontainerStyle,
  videoResizeMode,
}) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const isValidUrl = media.url && media.url.startsWith('http');
  const uri = isValidUrl ? media.url : '';

  const [videoLoading, setVideoLoading] = useState(true);
  const [calcMediaWidth, setCalcMediaWidth] = useState('100%');
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [cachedImage, setCachedImage] = useState(null);
  const [cachedVideo, setCachedVideo] = useState(null);
  const videoRef = useRef();

  const isImage = media && media.mime && media.mime.startsWith('image');
  const isVideo = media && media.mime && media.mime.startsWith('video');
  const noTypeStated = media && !media.mime;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.setIsMutedAsync(isVideoMuted);
    }
  }, [isVideoMuted]);

  useEffect(() => {
    const loadImage = async () => {
      if (noTypeStated && isValidUrl) {
        const image = await loadCachedItem({uri});
        console.log(image);
        setCachedImage(image);
      }
      if (isImage && isValidUrl) {
        const image = await loadCachedItem({uri});
        console.log(image);
        setCachedImage(image);
      }
      if (isVideo && isValidUrl) {
        const video = await loadCachedItem({uri});
        console.log(video);
        setCachedVideo(video);
      }
    };
    loadImage();
  }, [isImage, isValidUrl, isVideo, noTypeStated, uri]);

  useEffect(() => {
    (async () => {
      if (postMediaIndex === index && inViewPort) {
        if (videoRef.current) {
          await videoRef.current.replayAsync();
        }
      } else {
        if (videoRef.current) {
          await videoRef.current.pauseAsync(true);
        }
      }
    })();
  }, [inViewPort, index, postMediaIndex]);

  useEffect(() => {
    (async () => {
      const postMedia = item.postMedia;
      if (
        postMediaIndex < postMedia.length &&
        postMedia[postMediaIndex] &&
        postMedia[postMediaIndex].mime &&
        postMedia[postMediaIndex].mime.startsWith('video')
      ) {
        if (inViewPort) {
          if (videoRef.current) {
            await videoRef.current.setPositionAsync(0);
            await videoRef.current.playAsync(true);
          }
        } else {
          if (videoRef.current) {
            await videoRef.current.pauseAsync(true);
          }
        }
      }
    })();
  }, [inViewPort, item.postMedia, postMediaIndex]);

  useEffect(() => {
    (async () => {
      if (videoRef.current) {
        const videoStatus = await videoRef.current.getStatusAsync();
        if (videoStatus.isPlaying) {
          videoRef.current.pauseAsync(true);
        }
      }
    })();
  }, [willBlur]);

  const onVideoLoadStart = () => {
    setVideoLoading(true);
  };

  const onVideoLoad = (payload) => {
    setVideoLoading(false);
  };

  const onSoundPress = () => {
    setIsVideoMuted((prevIsVideoMuted) => !prevIsVideoMuted);
  };

  const onVideoMediaPress = () => {
    onMediaPress({index, item});
  };

  const onImageMediaPress = () => {
    onMediaPress({index, item});
  };

  if (isImage) {
    return (
      <View style={[mediaContainerStyle, mediaCellcontainerStyle]}>
        <TouchableOpacity
          style={mediaContainerStyle}
          activeOpacity={0.7}
          onPress={onImageMediaPress}>
          <Image
            style={[styles.bodyImage, mediaStyle]}
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
  if (isVideo) {
    return (
      <View style={[mediaContainerStyle, mediaCellcontainerStyle]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onVideoMediaPress}
          style={[styles.centerItem, mediaContainerStyle]}>
          {videoLoading && (
            <View style={[styles.mediaVideoLoader, styles.centerItem]}>
              <CirCleSnail {...circleSnailProps} />
            </View>
          )}
          <Video
            ref={videoRef}
            source={{uri: cachedVideo}}
            onLoad={onVideoLoad}
            resizeMode={videoResizeMode ? videoResizeMode : 'contain'}
            onLoadStart={onVideoLoadStart}
            style={[
              styles.bodyImage,
              {display: videoLoading ? 'none' : 'flex'},
            ]}
          />
          <TNTouchableIcon
            onPress={onSoundPress}
            imageStyle={styles.soundIcon}
            appStyles={StyleDict}
            containerStyle={styles.soundIconContainer}
            iconSource={
              isVideoMuted
                ? StyleDict.iconSet.soundMute
                : StyleDict.iconSet.sound
            }
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[mediaContainerStyle, mediaCellcontainerStyle]}>
      <TouchableOpacity
        style={[mediaContainerStyle]}
        activeOpacity={0.7}
        onPress={onImageMediaPress}>
        <Image
          source={{uri: cachedImage}}
          style={[styles.bodyImage, mediaStyle]}
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
