import auth from '@react-native-firebase/auth';
import {ErrorCode} from '../onboarding/utils/ErrorCode';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

const usersRef = firestore().collection('users');

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
