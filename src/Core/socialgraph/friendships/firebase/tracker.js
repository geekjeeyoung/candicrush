import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {firebaseUser} from '../../../firebase';
import {reportingManager} from '../../../user-reporting';
import * as firebaseFriendship from './friendship';

// Bookmark! ./friendship 만들기

import {
  setFriends,
  setFriendships,
  setFriendsListenerDidSubscribe,
} from '../redux';

export default class FriendshipTracker {
  constructor(
    reduxStore, // this.context.store
    userID,
    persistFriendshipsCounts = false,
    extendFollowers = false,
    enableFeedUpdates = false,
  ) {
    this.reduxStore = reduxStore;
    this.userID = userID;
    this.extendFollowers = extendFollowers; // if this is true, we extend friends to non-mutual follow statuses
    this.persistFriendshipsCounts = persistFriendshipsCounts; // if this is true, we persist the inbound and outbound counts in the users table
    this.enableFeedUpdates = enableFeedUpdates; // if this is true, we make extra hydrations & clean ups for stories & feed posts in social networks

    this.reduxStore.subscribe(this.syncTrackerToStore); // registering a callback that Redux store will call when an action has been dispatched. As soon as the Redux state has been updated, the view will re-render automatically
  }

  syncTrackerToStore = () => {
    const state = this.reduxStore.getState();
    this.users = state.auth.users;
  };

  subscribeIfNeeded = () => {};

  render() {
    return (
      <View>
        <Text> FriendshipTracker </Text>
      </View>
    );
  }
}

// this.friendshipTracker.subscribeIfNeeded(); / unsubscribe / unfriend / addFriendRequest / cancelFriendRequest / addFriendRequest 함수 만들기
