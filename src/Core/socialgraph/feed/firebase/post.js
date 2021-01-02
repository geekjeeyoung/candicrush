import firestore from '@react-native-firebase/firestore';
import {firebaseUser} from '../../../firebase';

export const postsRef = firestore().collection('SocialNetwork_Posts');

export const addPost = async (post, followerIDs, author) => {
  post.createdAt = firestore.FieldValue.serverTimestamp();
  post.author = author;
  try {
    const ref = await postsRef.add(post);
    const finalPost = {...post, id: ref.id};
    // add {id: ref.id} to post doc
    await postsRef.doc(ref.id).update(finalPost);

    // update posts count
    const postsForThisAuthor = await postsRef
      .where('authorID', '==', author.id)
      .get();
    const postsCount = postsForThisAuthor.docs
      ? postsForThisAuthor.docs.length
      : 0;
    firebaseUser.updateUserData(author.id, {postsCount: postsCount});

    const userIDFeedsToBeUpdated = [author.id].concat(followerIDs);
    // we update the feed for all the mutual friends / followers
    userIDFeedsToBeUpdated.forEach((userID) => {
      const otherUserMainFeedRef = firestore()
        .collection('social_feeds')
        .doc(userID)
        .collection('main_feed');
      otherUserMainFeedRef.doc(finalPost.id).set(finalPost);
    });
    return {success: true, id: ref.id};
  } catch (error) {
    return {error, success: false};
  }
};

export const subscribeToProfileFeedPosts = (userID, callback) => {
  const profilePostsRef = postsRef
    .where('authorID', '==', userID)
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      {includeMetadataChanges: true},
      (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          const post = doc.data;
          post.id = doc.id;
          posts.push(post);
        });
        return callback(posts);
      },
      (error) => {
        console.log(error);
        callback([]);
      },
    );
  return profilePostsRef;
};
