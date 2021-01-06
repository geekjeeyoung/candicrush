import firestore from '@react-native-firebase/firestore';

const abuseDBRef = firestore().collection('reports');

export const markAbuse = (outBoundID, toUserID, abuseType) => {
  if (outBoundID == toUserID) {
    return Promise((r) => {
      r();
    });
  }
  return new Promise((resolve) => {
    const data = {
      dest: toUserID,
      source: outBoundID,
      type: abuseType,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    abuseDBRef
      .add(data)
      .then(() => {
        resolve({success: true});
      })
      .catch((error) => {
        resolve({error: error});
      });
  });
};

export const unsubscribeAbuseDB = (userID, callback) => {
  abuseDBRef.where('source', '==', userID).onSnapshot((querySnapshot) => {
    const abuses = [];
    querySnapshot.forEach((doc) => {
      abuses.push(doc.data());
    });
    return callback(abuses);
  });
};
