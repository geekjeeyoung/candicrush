import firestore from '@react-native-firebase/firestore';
import {firebaseUser} from '../../../firebase';
import {firebasePost, firebaseStory} from '../../feed/firebase';

const usersRef = firestore().collection('users');
const friendshipsRef = firestore().collection('friendships');

const updateFriendshipsCounts = async (userID) => {
  // inbound
  const inbound = await friendshipsRef.where('user2', '==', userID).get();
  const inboundCount = inbound.docs ? inbound.docs.length : 0;
  firebaseUser.updateUserData(userID, {inboundFriendsCount: inboundCount});
  // outbound
  const outbound = await friendshipsRef.where('user1', '==', userID).get();
  const outboundCount = outbound.docs ? outbound.docs.length : 0;
  firebaseUser.updateUserData(userID, {outboundFriendsCount: outboundCount});
};

export const addFriendRequest = (
  outBound,
  toUser,
  persistFriendshipsCounts,
  enableFeedUpdates,
  extendFollowers,
  callback,
) => {
  const outBoundID = outBound.id;
  const toUserID = toUser.id;

  if (outBoundID == toUserID) {
    callback(null);
    return;
  }

  friendshipsRef
    .add({
      user1: outBoundID,
      user2: toUserID,
      created_at: firestore.FieldValue.serverTimestamp(),
      createdAt: firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      if (persistFriendshipsCounts) {
        updateFriendshipsCounts(outBoundID);
        updateFriendshipsCounts(toUserID);
      }
      if (enableFeedUpdates) {
        if (extendFollowers) {
          // we followed someone so we populate our own feed with posts & stories from that person
          firebasePost.hydrateFeedForNewFriendship(outBoundID, toUserID);
          firebaseStory.hydrateStoriesForNewFriendship(outBoundID, toUserID);
        }
      }
      //   BookMark
    });
};
