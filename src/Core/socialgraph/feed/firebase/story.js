import firestore from '@react-native-firebase/firestore';

export const storiesRef = firestore().collection('SocialNetwork_Stories');

export const hydrateStoriesForNewFriendship = async (
  destUserID,
  sourceUserID,
) => {
  // we take all stories from sourceUserID and populate the stories of destUserID
  const storiesDestRef = firestore()
    .collection('social_feeds')
    .doc(destUserID)
    .collection('stories_feed');

  const unsubscribeToSourceStories = storiesRef
    .where('authorID', '==', sourceUserID)
    .onSnapshot(
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const story = doc.data();
          if (story.id) {
            storiesDestRef.doc(story.id).set(story);
          }
        });
        unsubscribeToSourceStories();
      },
      (error) => {
        console.log(error);
      },
    );
};

export const removeStoriesForOldFriendship = async (
  destUserID,
  oldFriendID,
) => {
  // We remove all stories authored by oldFriendID from destUserID's stories tray
  const storiesDestRef = firestore()
    .collection('social_feeds')
    .doc(destUserID)
    .collection('stories_feed');

  const unsubscribeToSourceStories = storiesRef
    .where('authorID', '==', oldFriendID)
    .onSnapshot(
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const story = doc.data();
          if (story.id) {
            storiesDestRef.doc(story.id).delete();
          }
        });
        unsubscribeToSourceStories();
      },
      (error) => {
        console.log(error);
      },
    );
};
