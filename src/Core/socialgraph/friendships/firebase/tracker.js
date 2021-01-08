import {setUserData} from '../../../onboarding/redux/auth';
import {FriendshipConstants} from '../constants';
import {setFriendsListenerDidSubscribe} from '../redux';
import {firebaseUser} from './../../../firebase';
import * as firebaseFriendship from './friendship';
import {reportingManager} from '../../../user-reporting';
import {setBannedUserIDs} from '../../../user-reporting/redux';

export default class FriendshipTracker {
  constructor(
    reduxStore,
    userID,
    persistFriendshipsCounts = false,
    extendFollowers = false,
    enableFeedUpdates = false,
  ) {
    this.reduxStore = reduxStore;
    this.userID = userID;
    this.extendFollowers = extendFollowers;
    this.persistFriendshipsCounts = persistFriendshipsCounts;
    this.enableFeedUpdates = enableFeedUpdates;
    this.reduxStore.subscribe(this.syncTrackerToStore);
  }

  syncTrackerToStore = () => {
    const state = this.reduxStore.getState();
    this.users = state.auth.users;
  };

  subscribeIfNeeded = () => {
    const userId = this.userID;
    const state = this.reduxStore.getState();
    if (!state.friends.didSubscribeToFriendships) {
      this.reduxStore.dispatch(setFriendsListenerDidSubscribe());
      this.currentUserUnsubscribe = firebaseUser.subscribeCurrentUser(
        userId,
        this.onCurrentUserUpdate,
      );
      this.usersUnsubscribe = firebaseUser.subscribeUsers(
        this.onUsersCollection,
      );
      this.abusesUnsubscribe = reportingManager.unsubscribeAbuseDB(
        userId,
        this.onAbusesUpdate,
      );
      this.inboundFriendshipsUnsubscribe = firebaseFriendship.subscribeToInboundFriendships(
        userId,
        this.onInboundFriendshipsUpdate,
      );
      this.outboundFriendshipsUnsubscribe = firebaseFriendship.subscribeToOutboundFriendships(
        userId,
        this.onOutboundFriendshipsUpdate,
      );
    }
  };

  unsubscribe = () => {
    if (this.currentUserUnsubscribe) {
      this.currentUserUnsubscribe();
    }
    if (this.usersUnsubscribe) {
      this.usersUnsubscribe();
    }
    if (this.inboundFriendshipsUnsubscribe) {
      this.inboundFriendshipsUnsubscribe();
    }
    if (this.outboundFriendshipsUnsubscribe) {
      this.outboundFriendshipsUnsubscribe();
    }
    if (this.abusesUnsubscribe) {
      this.abusesUnsubscribe();
    }
  };

  addFriendRequest = (outBound, toUser, callback) => {
    if (outBound.id == toUser.id) {
      callback(null);
      return;
    }

    const state = this.reduxStore.getState();
    const friendships = state.friends.friendships;
    const detectedFriendship = friendships.find(
      (friendship) => friendship.user.id == toUser.id,
    );
    if (
      detectedFriendship &&
      detectedFriendship.type != FriendshipConstants.FriendshipType.inbound
    ) {
      // invalid state - current user already requested a friendship to toUser
      callback(null);
      return;
    }

    firebaseFriendship.addFriendRequest(
      outBound,
      toUser,
      this.persistFriendshipsCounts,
      this.enableFeedUpdates,
      this.extendFollowers,
      (response) => {
        if (this.extendFollowers == false) {
          const _friendships = state.friends.friendships;
          const _detectedFriendship = _friendships.find(
            (friendship) =>
              friendship.user.id == toUser.id &&
              friendship.type == FriendshipConstants.FriendshipType.inbound,
          );
          if (_detectedFriendship) {
            firebaseFriendship.updateFeedsForNewFriends(outBound.id, toUser.id);
          }
        }
        callback(response);
      },
    );
  };

  unfriend = (outBound, toUser, callback) => {
    if (outBound.id == toUser.id) {
      callback(null);
      return;
    }

    firebaseFriendship.unfriend(
      outBound.id,
      toUser.id,
      this.persistFriendshipsCounts,
      this.enableFeedUpdates,
      callback,
    );
  };

  cancelFriendRequest = (outBound, toUser, callback) => {
    if (outBound.id == toUser.id) {
      callback(null);
      return;
    }
    firebaseFriendship.cancelFriendRequest(
      outBound.id,
      toUser.id,
      this.persistFriendshipsCounts,
      this.enableFeedUpdates,
      callback,
    );
  };

  onCurrentUserUpdate = (user) => {
    this.reduxStore.dispatch(setUserData({user}));
  };

  onUsersCollection = (data, completeData) => {
    this.updateUsers(completeData);
  };

  onAbusesUpdate = (abuses) => {
    let bannedUserIDs = [];
    abuses.forEach((abuse) => bannedUserIDs.push(abuse.dest));
    this.reduxStore.dispatch(setBannedUserIDs(bannedUserIDs));
    this.bannedUserIDs = bannedUserIDs;
    this.purgeBannedUsers();
    this.hydrateFriendships();
  };

  onInboundFriendshipsUpdate = (inboundFriendships) => {
    this.inboundFriendships = inboundFriendships;
    this.hydrateFriendships();
  };

  onOutboundFriendshipsUpdate = (outboundFriendships) => {
    this.outboundFriendships = outboundFriendships;
    this.hydrateFriendships();
  };

  hydrateFriendships() {
    const inboundFriendships = this.inboundFriendships;
    const outboundFriendships = this.outboundFriendships;
    const hydratedUsers = this.users; // state.auth.users
    const bannedUserIDs = this.bannedUserIDs;
    if (
      hydratedUsers &&
      hydratedUsers.length > 0 &&
      inboundFriendships &&
      outboundFriendships &&
      bannedUserIDs
    ) {
      // we received all the data we need - users, inbound requests, outbound requests, and user reports

      const outboundFriendsIDs = {};
      outboundFriendships.forEach((friendship) => {
        outboundFriendsIDs[friendship.user2] = true;
      });
      const inboundFriendsIDs = {};
      inboundFriendships.forEach((friendship) => {
        inboundFriendsIDs[friendship.user1] = true;
      });
      const reciprocalfriendships = inboundFriendships.filter(
        (inboundFriendship) =>
          outboundFriendsIDs[inboundFriendship.user1] == true,
      );
      const friendsIDs = reciprocalfriendships.map(
        (inboundFriendship) => inboundFriendship.user1,
      );
      const friendsIDsHash = {};
      friendsIDs.forEach((friendID) => {
        friendsIDsHash[friendID] = true;
      });
      const usersHash = {};
      hydratedUsers.forEach((user) => {
        usersHash[user.id] = user;
      });
      // (Bookmark) const hydratedFriends = hydratedUsers.filter();
    }
  }

  updateUsers = (users) => {};

  purgeBannedUsers() {}
}
