import React, {Component, createRef} from 'react';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';
import Modal from 'react-native-modalbox';

const Image = createImageProgress(FastImage);

const {width, height} = Dimensions.get('window');
const swipeArea = Math.floor(height * 0.2);
const circleSnailProps = {thickness: 2, color: '#ddd', size: 80};

export default class TNMediaViewerModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calcImgHeight: Math.floor(height * 0.6),
    };
    this.imageLoading = false;
    this.imageDoneLoading = false;
    this.mediaLayouts = [];
    this.scrollviewRef = createRef();
  }
  render() {
    const {isModalOpen, onClosed, mediaItems, selectedMediaIndex} = this.props;
    const {calcImgHeight} = this.state;
    return (
      <Modal isOpen={isModalOpen} onClosed={onClosed}>
        <ScrollView>
          {mediaItems.length > 0 &&
            mediaItems.map((uri, index) => {
              <View>
                <Image source={{uri}} />
              </View>;
            })}
        </ScrollView>
      </Modal>
    );
  }
}

{
  /* <TNMediaViewerModal
        mediaItems={feedItems}
        isModalOpen={isMediaViewerOpen}
        onClosed={onMediaClose}
        selectedMediaIndex={selectedMediaIndex}
      /> */
}
