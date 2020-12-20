import auth from '@react-native-firebase/auth';
import {ErrorCode} from '../onboarding/utils/ErrorCode';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

const usersRef = firestore().collection('users');

export const retrievePersistedAuthUser = () => {
  return new Promise((resolve) => {
    return auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            resolve({...userData, id: user.uid, userID: user.uid});
          })
          .catch((error) => {
            resolve(null);
          });
      } else {
        resolve(null);
      }
    });
  });
};

export const register = (userDetails) => {
  const {
    email,
    firstName,
    lastName,
    password,
    appIdentifier,
    phone,
    profilePictureURL,
    location,
    signUpLocation,
  } = userDetails;
  return new Promise(function (resolve, _reject) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const timestamp = firestore.FieldValue.serverTimestamp();
        const uid = response.user.uid;

        const data = {
          id: uid,
          userID: uid, // legacy reasons
          email,
          password,
          firstName,
          lastName,
          phone: phone || '',
          profilePictureURL,
          location: location || '',
          signUpLocation: signUpLocation || '',
          appIdentifier,
          createdAt: timestamp,
          created_at: timestamp,
        };
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            resolve({user: data});
          })
          .catch((error) => {
            Alert.alert(error);
            resolve({error: ErrorCode.serverError});
          });
      })
      .catch((error) => {
        console.log('_error:', error);
        let errorCode = ErrorCode.serverError;
        if (error.code === 'auth/email-already-in-use') {
          errorCode = ErrorCode.emailInUse;
        }
        resolve({error: errorCode});
      });
  });
};

export const updateProfilePhoto = (userID, profilePictureURL) => {
  return new Promise((resolve, _reject) => {
    usersRef
      .doc(userID)
      .update({profilePictureURL: profilePictureURL})
      .then(() => {
        resolve({success: true});
      })
      .catch((error) => {
        resolve({error: error});
      });
  });
};

export const loginWithEmailAndPassword = (email, password) => {
  return new Promise(function (resolve, _reject) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const userData = {email, password, id: uid};
        usersRef
          .doc(uid)
          .get()
          .then(function (firestoreDocument) {
            if (!firestoreDocument.exists) {
              resolve({error: ErrorCode.noUser});
              return;
            }
            const user = firestoreDocument.data();
            const newUserData = {
              ...user,
              ...userData,
            };
            resolve({user: newUserData});
          })
          .catch(function (_error) {
            console.log('_error: ', _error);
            resolve({error: ErrorCode.serverError});
          });
      })
      .catch((error) => {
        console.log('error: ', error);
        let errorCode = ErrorCode.serverError;
        switch (error.code) {
          case 'auth/wrong-password':
            errorCode = ErrorCode.invalidPassword;
            break;
          case 'auth/network-request-failed':
            errorCode = ErrorCode.serverError;
            break;
          case 'auth/user-not-found':
            errorCode = ErrorCode.noUser;
            break;
          default:
            errorCode = ErrorCode.serverError;
        }
        resolve({error: errorCode});
      });
  });
};
