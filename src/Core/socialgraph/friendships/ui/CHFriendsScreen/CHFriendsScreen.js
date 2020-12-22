import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Localized} from '../../../../localization/Localization';
import {Platform} from 'react-native';
import StyleDict from '../../../../../AppStyles';
import {TNTouchableIcon} from '../../../../truly-native';
import {CHFriendsListComponent} from '../..';

class CHFriendsScreen extends Component {
  static navigationOptions = ({screenProps, navigation}) => {
    let currentTheme = StyleDict.navThemeConstants[screenProps.theme];
    let headerTitle =
      Platform.OS === 'ios' ? (
        Localized('Friends')
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
            {Localized('Friends')}
          </Text>
        </View>
      );
    const {params = {}} = navigation.state;
    return {
      headerTitle: headerTitle,
      headerLeft: Platform.OS === 'android' && (
        <TNTouchableIcon
          imageStyle={{tintColor: currentTheme.activeTintColor}}
          iconSource={StyleDict.iconSet.menuHamburger}
          onPress={params.openDrawer}
          appStyles={StyleDict}
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

    this.state = {
      isSearchModalOpen: false,
    };

    this.searchBarRef = React.createRef();
  }

  componentDidMount() {
    this.props.navigation.setParams({
      openDrawer: this.openDrawer,
    });
  }

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
        searchBar={true}
        onSearchBarPress={this.onSearchBar}
        isSearchModalOpen={this.state.isSearchModalOpen}
        onSearchModalClose={this.onSearchModalClose}
        appStyles={StyleDict}
        onSearchBarCancel={this.onSearchBar}
        emptyStateConfig={emptyStateConfig}
      />
    );
  }
}

CHFriendsScreen.propTypes = {
  // prop: PropTypes.array,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CHFriendsScreen);
