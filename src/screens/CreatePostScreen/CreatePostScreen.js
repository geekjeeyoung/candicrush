import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {ActivityIndicator, Alert, BackHandler} from 'react-native';
import TextButton from 'react-native-button';
import {connect} from 'react-redux';
import StyleDict from '../../AppStyles';
import {CreatePost} from '../../components';
import {firebaseStorage} from '../../Core/firebase';
import {Localized} from '../../Core/localization/Localization';
import {firebasePost} from '../../Core/socialgraph/feed/firebase';
import {friendshipUtils} from '../../Core/socialgraph/friendships';

const defaultPost = {
  postText: '',
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

class CreatePostScreen extends Component {
  static navigationOptions = ({screenProps, navigation}) => {
    let currentTheme = StyleDict.navThemeConstants[screenProps.theme];
    const {params = {}} = navigation.state;

    return {
      headerTitle: Localized('Create Post'),
      headerRight: () =>
        params.isPosting ? (
          <ActivityIndicator style={{margin: 10}} size="small" />
        ) : (
          <TextButton style={{marginRight: 12}} onPress={params.onPost}>
            Post
          </TextButton>
        ),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomColor: currentTheme.hairlineColor,
      },
      headerTintColor: currentTheme.fontColor,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      post: defaultPost,
      postMedia: [],
      location: '',
    };
    this.inputRef = React.createRef();
    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      (payload) =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onPost: this.onPost,
      isPosting: false,
    });

    this.inputRef.current.focus();
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      (payload) =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  onPostDidChange = (post) => {
    this.setState({post});
  };

  onSetMedia = (photos) => {
    this.setState({postMedia: [...photos]});
  };

  onLocationDidChange = (location) => {
    this.setState({location});
  };

  onPost = async () => {
    const isEmptyPost = this.state.post.postText.trim() === '';

    if (this.state.postMedia.length === 0) {
      Alert.alert(
        'Post not completed',
        Localized(
          'You cannot upload a post without uploaded photos or videos. Please try again.',
        ),
        [{text: Localized('OK')}],
        {cancelable: false},
      );
      return;
    }
    this.props.navigation.setParams({
      isPosting: true,
    });

    this.setState(
      {
        isPosting: true,
        post: {
          ...this.state.post,
          authorID: this.props.user.id,
          location: this.state.location,
          postMedia: this.state.postMedia,
        },
      },
      async () => {
        if (
          this.state.post &&
          this.state.post.postMedia &&
          this.state.post.postMedia.length === 0
        ) {
          await firebasePost.addPost(
            this.state.post,
            friendshipUtils.followerIDs(
              this.props.friendships,
              this.props.friends,
              true,
            ),
            this.props.user,
          );
          this.props.navigation.goBack();
        } else {
          this.startPostUpload();
        }
      },
    );
  };

  startPostUpload = async () => {
    const uploadPromises = [];
    const mediaSources = [];
    this.state.post.postMedia.forEach((media) => {
      const {uploadUri, mime} = media;
      uploadPromises.push(
        new Promise((resolve, reject) => {
          firebaseStorage.uploadImage(uploadUri).then((response) => {
            if (!response.error) {
              mediaSources.push({url: response.downloadURL, mime});
            } else {
              Alert.alert(
                Localized(
                  'Oops! An error occured while uploading your post. Please try again.',
                ),
              );
            }
            resolve();
          });
        }),
      );
    });
    Promise.all(uploadPromises).then(async () => {
      const postToUpload = {...this.state.post, postMedia: [...mediaSources]};
      firebasePost.addPost(
        postToUpload,
        friendshipUtils.followerIDs(
          this.props.friendships,
          this.props.friends,
          true,
        ),
        this.props.user,
      );
    });
    this.props.navigation.goBack();
  };

  blurInput = () => {
    this.inputRef.current.blur();
  };

  render() {
    return (
      <CreatePost
        inputRef={this.inputRef}
        user={this.props.user}
        onPostDidChange={this.onPostDidChange}
        onSetMedia={this.onSetMedia}
        onLocationDidChange={this.onLocationDidChange}
        blurInput={this.blurInput}
      />
    );
  }
}

CreatePostScreen.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = ({auth, friends}) => {
  return {
    user: auth.user,
    friends: friends.friends,
    friendships: friends.friendships,
  };
};

export default connect(mapStateToProps)(CreatePostScreen);
