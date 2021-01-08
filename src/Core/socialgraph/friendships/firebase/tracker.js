import {setUserData, setUsers} from '../../../onboarding/redux/auth';
import {FriendshipConstants} from '../constants';
import {
  setFriends,
  setFriendships,
  setFriendsListenerDidSubscribe,
} from '../redux';
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
      const hydratedFriends = hydratedUsers.filter(
        (user) =>
          outboundFriendsIDs[user.id] == true &&
          inboundFriendsIDs[user.id] == true,
      );
      const friendshipsFromFriends = hydratedFriends.map((user) => {
        return {
          user: user,
          type: 'reciprocal',
        };
      });
      const friendshipsFromInbound = inboundFriendships
        .filter(
          (friendship) =>
            friendsIDsHash[friendship.user1] != true &&
            usersHash[friendship.user1],
        )
        .map((friendship) => {
          return {
            user: usersHash[friendship.user1],
            type: 'inbound',
          };
        });

      const friendshipsFromOutbound = outboundFriendships
        .filter(
          (friendship) =>
            friendsIDsHash[friendship.user2] != true &&
            usersHash[friendship.user2],
        )
        .map((friendship) => {
          return {
            user: usersHash[friendship.user2],
            type: 'outbound',
          };
        });

      let finalFriendships = [
        ...friendshipsFromInbound,
        ...friendshipsFromFriends,
        ...friendshipsFromOutbound,
      ].filter((friendship) => !bannedUserIDs.includes(friendship.user.id));

      let dedupedFriendships = [];
      let tempHash = {};
      finalFriendships.forEach((friendship) => {
        if (tempHash[friendship.user.id] != true) {
          dedupedFriendships.push(friendship);
          tempHash[friendship.user.id] = true;
        }
      });
      finalFriendships = dedupedFriendships;

      this.reduxStore.dispatch(setFriendships(finalFriendships));

      const finalFriends = hydratedFriends.filter(
        (friend) => !bannedUserIDs.includes(friend.id),
      );
      this.reduxStore.dispatch(setFriends(finalFriends));
    }
  }

  updateUsers = (users) => {
    // We remove all friends and friendships from banned users
    const state = this.reduxStore.getState();
    const bannedUserIDs = state.userReports.bannedUserIDs;

    if (bannedUserIDs) {
      this.users = users.filter((user) => !bannedUserIDs.includes(user.id));
    } else {
      this.users = users;
    }
    this.reduxStore.dispatch(setUsers(this.users));

    this.hydrateFriendships();
  };

  purgeBannedUsers() {
    const state = this.reduxStore.getState();
    const bannedUserIDs = this.bannedUserIDs;
    if (bannedUserIDs) {
      const users = state.auth.users.filter(
        (user) => !bannedUserIDs.includes(user.id),
      );
      this.reduxStore.dispatch(setUsers(users));
    }
  }
}
