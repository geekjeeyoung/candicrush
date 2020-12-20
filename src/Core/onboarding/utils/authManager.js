import {firebaseAuth} from '../../firebase';
import {firebaseStorage} from '../../firebase/storage';

const defaultProfilePhotoURL =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg';

const loginWithEmailAndPassword = (email, password) => {
  return new Promise(function (resolve, _reject) {
    firebaseAuth.loginWithEmailAndPassword(email, password).then((response) => {
      if (!response.error) {
        handleSuccessfulLogin({...response.user}, false).then((res) => {
          resolve({user: res.user});
        });
      } else {
        resolve({error: response.error});
      }
    });
  });
};

const createAccountWithEmailAndPassword = (userDetails) => {
  const accountCreationTask = (userData) => {
    return new Promise((resolve, _reject) => {
      firebaseAuth.register(userData).then(async (response) => {
        if (response.error) {
          resolve({error: response.error});
        } else {
          // We created the user succesfully, time to upload the profile photo and update the users table with the correct URL
          let user = response.user;
          if (userData.profilePictureURL) {
            firebaseStorage
              .uploadImage(userData.profilePictureURL)
              .then((_response) => {
                if (_response.error) {
                  // if account gets created, but photo upload fails, we still log the user in
                  resolve({
                    nonCriticalError: _response.error,
                    user: {
                      ...user,
                      profilePictureURL: defaultProfilePhotoURL,
                    },
                  });
                } else {
                  firebaseAuth
                    .updateProfilePhoto(user.id, _response.downloadURL)
                    .then((_result) => {
                      if (_result.error) {
                        resolve({
                          nonCriticalError: _result.error,
                          user: {
                            ...user,
                            profilePictureURL: defaultProfilePhotoURL,
                          },
                        });
                      } else {
                        resolve({
                          user: {
                            ...user,
                            profilePictureURL: _response.downloadURL,
                          },
                        });
                      }
                    });
                }
              });
          } else {
            resolve({
              user: {
                ...response.user,
                profilePictureURL: defaultProfilePhotoURL,
              },
            });
          }
        }
      });
    });
  };

  return new Promise(function (resolve, _reject) {
    accountCreationTask(userDetails).then((response) => {
      if (response.error) {
        resolve({error: response.error});
      } else {
        // We signed up successfully, so we are logging the user in (as well as updating push token, persisting credential,s etc.)
        handleSuccessfulLogin(response.user, true).then((_response) => {
          resolve({
            ..._response,
            // stripeCustomer: '',
          });
        });
      }
    });
  });
};

const handleSuccessfulLogin = (user, accountJustCreated) => {
  // After a successful login, we fetch & store the device token for push notifications, location, online status, etc.
  // we don't wait for fetching & updating the location or push token, for performance reasons (especially on Android)
  //   fetchAndStoreExtraInfoUponLogin(user, accountCreated);
  return new Promise((resolve) => {
    resolve({user: {...user}});
  });
};

const authManager = {
  createAccountWithEmailAndPassword,
  loginWithEmailAndPassword,
};

export default authManager;
