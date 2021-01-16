import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import {FriendshipConstants} from '../../constants';
import dynamicStyles from './styles';
import PropTypes from 'prop-types';
import {CHConversationIconView} from '../../../../chat';

const CHFriendItem = (props) => {
  const {
    item,
    index,
    onFriendAction,
    onFriendItemPress,
    appStyles,
    followEnabled,
    displayActions,
  } = props;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const user = item.user;
  let actionTitle = followEnabled
    ? FriendshipConstants.localizedFollowActionTitle(item.type)
    : FriendshipConstants.localizedActionTitle(item.type);

  let name = 'No name';
  if (user.firstName && user.lastName) {
    name = user.firstName + ' ' + user.lastName;
  } else if (user.fullname) {
    name = user.fullname;
  } else if (user.firstName) {
    name = user.firstName;
  }

  const renderActions = (_displayActions, _actionTitle) => {
    if (_displayActions && _actionTitle) {
      return (
        <View
          style={
            followEnabled
              ? [styles.addFlexContainerFollow]
              : [styles.addFlexContainer]
          }>
          <TouchableOpacity
            onPress={() => onFriendAction(item, index)}
            style={followEnabled ? [styles.followButton] : [styles.addButton]}>
            <Text
              style={
                followEnabled
                  ? [styles.followActionTitle]
                  : [styles.name, {padding: 0}]
              }>
              {_actionTitle}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onFriendItemPress(item)}
      style={styles.friendItemContainer}>
      <View style={styles.chatIconContainer}>
        <CHConversationIconView
          style={styles.photo}
          imageStyle={styles.photo}
          participants={[user]}
          appStyles={appStyles}
        />
        {name && <Text style={styles.name}>{name}</Text>}
      </View>
      {renderActions(displayActions, actionTitle)}
      <View style={styles.divider} />
    </TouchableOpacity>
  );
};

CHFriendItem.propTypes = {
  onFriendAction: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  item: PropTypes.object,
  index: PropTypes.number,
  followEnabled: PropTypes.bool,
};

CHFriendItem.defaultProps = {
  displayActions: true,
};

export default memo(CHFriendItem);
