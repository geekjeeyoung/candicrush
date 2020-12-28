import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import StyleDict from '../../AppStyles';
import {Localized} from '../../Core/localization/Localization';
import {ActivityIndicator} from 'react-native';
import TextButton from 'react-native-button';
import {BackHandler} from 'react-native';

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
      headerRight: params.isPosting ? (
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

    // this.inputRef.current.focus();
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

    if (this.state.postMedia.length === 0 && isEmptyPost) {
      Alert.alert(
        'Post not completed',
        Localized('You may not upload an empty post. Kindly try again.'),
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
      async () => {},
    );
  };

  render() {
    return (
      <View>
        <Text> prop </Text>
      </View>
    );
  }
}

const mapStateToProps = ({auth, friends}) => {
  return {
    user: auth.user,
    friends: friends.friends,
    friendships: friends.friendships,
  };
};

export default connect(mapStateToProps)(CreatePostScreen);
