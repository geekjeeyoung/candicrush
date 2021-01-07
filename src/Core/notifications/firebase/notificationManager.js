import firestore from '@react-native-firebase/firestore';

const notificationsRef = firestore().collection('notifications');

const fcmURL = 'https://fcm.googleapis.com/fcm/send';
const firebaseServerKey =
  'AAAAghv5Awk:APA91bF4k5ssEdjXt-gFkBqjqBhwOrOQWwUXIdBzSEnk2chOgTOdH8hDFPhhe1nxxvbf7OIVOMRoCK1WyxE7jYND05K0eRsmy5gzFuq-Pb050i3ZVHIhQW0yvfdtu6EeNHKWXBkRLcws';

const sendPushNotification = async (
  toUser,
  title,
  body,
  type,
  metadata = {},
) => {
  if (metadata && metadata.outBound && toUser.id == metadata.outBound.id) {
    return;
  }
  const notification = {
    toUserID: toUser.id,
    title,
    body,
    metadata,
    toUser,
    type,
    seen: false,
  };

  const ref = await notificationsRef.add({
    ...notification,
    createdAt: firestore().FieldValue.serverTimestamp(),
  });
  notificationsRef.doc(ref.id).update({id: ref.id});

  if (!toUser.pushToken) {
    return;
  }

  const pushNotification = {
    to: toUser.pushToken,
    notification: {
      title: title,
      body: body,
    },
    data: {...metadata, type, toUserID: toUser.id},
  };

  fetch(fcmURL, {
    method: 'post',
    headers: new Headers({
      Authorization: 'key=' + firebaseServerKey,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(pushNotification),
  });
};

const sendCallNotification = async (
  sender,
  recipient,
  channelID,
  callType,
  callID,
) => {
  if (!recipient.pushToken) {
    return;
  }
  const pushNotification = {
    to: recipient.pushToken,
    priority: 'high',
    data: {
      channelID,
      recipientID: recipient.id,
      senderID: sender.id,
      callType,
      callID,
      callerName: sender.firstName,
      priority: 'high',
      contentAvailable: true,
    },
  };

  try {
    const response = await fetch(fcmURL, {
      method: 'post',
      headers: new Headers({
        Authorization: 'key=' + firebaseServerKey,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(pushNotification),
    });
    console.log('call notif ' + JSON.stringify(pushNotification));
    console.log(JSON.stringify(response));
  } catch (error) {
    console.log(error);
  }
};

export const notificationManager = {
  sendPushNotification,
  sendCallNotification,
};
