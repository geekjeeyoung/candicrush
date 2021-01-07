import firestore from '@react-native-firebase/firestore';

export const notificationsRef = firestore().collection('notifications');

export const subscribeNotifications = (userID, callback) => {};
