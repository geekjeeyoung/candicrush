import {decode, encode} from 'base-64';
import './timerConfig';
import analytics from '@react-native-firebase/analytics';

global.addEventListener = (x) => x;
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBM4-HTC-YDLx1pYi_4NUIZy025cCDZLsI',
  authDomain: 'candicrush-photosharingapp.firebaseapp.com',
  projectId: 'candicrush-photosharingapp',
  storageBucket: 'candicrush-photosharingapp.appspot.com',
  messagingSenderId: '558815052553',
  appId: '1:558815052553:web:70fcd70983238e1e9d89d8',
  measurementId: 'G-LW41LT28C4',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  analytics();
}

export {firebase};
