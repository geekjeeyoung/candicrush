import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

class FeedScreen extends Component {
  state = {
    mute: false,
    fullScreen: false,
    repeat: true,
    paused: true,
  };

  handlePlayAndPause = () => {
    this.setState((prevState) => ({
      paused: !prevState.paused,
    }));
  };

  handleVolume = () => {
    this.setState((prevState) => ({
      mute: !prevState.mute,
    }));
  };

  render() {
    const {width, height} = Dimensions.get('window');

    return (
      <View style={styles.container}>
        <Video
          source={{
            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          resizeMode="cover"
          style={{width, height: height / 3}}
          muted={this.state.mute}
          repeat={this.state.repeat}
          paused={this.state.paused}
        />
        <View style={styles.controlBar}>
          <Icon
            name={this.state.mute ? 'volume-mute' : 'volume-up'}
            size={45}
            color="white"
            onPress={this.handleVolume}
          />
          <Icon
            name={this.state.paused ? 'pause' : 'play-arrow'}
            size={45}
            color="white"
            onPress={this.handlePlayAndPause}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default FeedScreen;
