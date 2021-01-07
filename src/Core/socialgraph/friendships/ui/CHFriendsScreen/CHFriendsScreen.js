import React, {Component, createRef} from 'react';
import {Platform, Text, View} from 'react-native';
import {connect, ReactReduxContext} from 'react-redux';
import {CHFriendsListComponent} from '../..';
import StyleDict from '../../../../../AppStyles';
import {Localized} from '../../../../localization/Localization';
import {TNTouchableIcon} from '../../../../truly-native';
import {setFriendships, setFriends} from '../../redux';
import {setUsers} from '../../../../onboarding/redux/auth';
import PropTypes from 'prop-types';
import FriendshipTracker from '../../firebase/tracker';

class CHFriendsScreen extends Component {
  static contextType = ReactReduxContext;

  static navigationOptions = ({screenProps, navigation}) => {
    let appStyles = navigation.state.params.appStyles;
    let showDrawerMenuButton = navigation.state.params.showDrawerMenuButton;
    let headerTitle =
      navigation.state.params.friendsScreenTitle || Localized('Friends');
    let currentTheme = appStyles.navThemeConstants[screenProps.theme];
    const {params = {}} = navigation.state;
    return {
      headerTitle: !showDrawerMenuButton ? (
        headerTitle
      ) : (
        <View
          style={{
            alignItems: 'center',
            flex: 1,
          }}>
          <Text
            style={{
              fontSize: 18,
              // color: currentTheme.fontColor,
            }}>
            {headerTitle}
          </Text>
        </View>
      ),
      headerLeft: () =>
        showDrawerMenuButton && (
          <TNTouchableIcon
            imageStyle={{tintColor: currentTheme.activeTintColor}}
            iconSource={appStyles.iconSet.menuHamburger}
            onPress={params.openDrawer}
            appStyles={appStyles}
          />
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

    this.appStyles =
      props.navigation.state.params.appStyles ||
      props.navigation.getParam('appStyles');
    this.followEnabled =
      props.navigation.state.params.followEnabled ||
      props.navigation.getParam('followEnabled');

    this.state = {
      isSearchModalOpen: false,
      filteredFriendships: [],
      isLoading: false,
    };
    this.searchBarRef = createRef();
  }

  componentDidMount() {
    const user = this.props.user;
    this.friendshipTracker = new FriendshipTracker(
      this.context.store,
      user.id,
      this.followEnabled,
      this.followEnabled,
      this.followEnabled,
    );
    this.friendshipTracker.subscribeIfNeeded();

    this.props.navigation.setParams({
      openDrawer: this.openDrawer,
    });
  }

  // {Bookmark : componentWillUnmount() 부터 만들기}

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  onEmptyStatePress = () => {
    this.onSearchBar();
  };

  onSearchBar = () => {
    this.setState((prevState) => ({
      isSearchModalOpen: !prevState.isSearchModalOpen,
    }));
    setTimeout(() => {
      if (this.searchBarRef.current) {
        this.searchBarRef.current.focus();
      }
    }, 1000);
  };

  onSearchModalClose = () => {
    this.setState({
      isSearchModalOpen: false,
    });
  };

  render() {
    const emptyStateConfig = {
      title: Localized('No Friends'),
      description: Localized(
        'Make some friend requests and have your friends accept them. All your friends will show up here.',
      ),
      buttonName: Localized('Find friends'),
      onPress: this.onEmptyStatePress,
    };

    return (
      <CHFriendsListComponent
        searchBarRef={this.searchBarRef}
        friendsData={this.props.friendships}
        searchBar={true}
        onSearchBarPress={this.onSearchBar}
        isSearchModalOpen={this.state.isSearchModalOpen}
        onSearchModalClose={this.onSearchModalClose}
        appStyles={StyleDict}
        onSearchBarCancel={this.onSearchBar}
        emptyStateConfig={emptyStateConfig}
        isLoading={this.state.isLoading}
      />
    );
  }
}

CHFriendsScreen.propTypes = {
  friends: PropTypes.array,
  friendships: PropTypes.array,
  users: PropTypes.array,
  setFriends: PropTypes.func,
};

const mapStateToProps = ({friends, auth}) => {
  return {
    friendships: friends.friendships,
    users: auth.users,
    friends: friends.friends,
    user: auth.user,
  };
};

const mapDispatchToProps = {setUsers, setFriends, setFriendships};

export default connect(mapStateToProps, mapDispatchToProps)(CHFriendsScreen);
