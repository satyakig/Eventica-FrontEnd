import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/storage';
import React from 'react';
import { v4 } from 'uuid';

const firebase = app.initializeApp({
  apiKey: 'AIzaSyDGt23yzVQmF0mdIqUilPLCGNjnpX_aaMM',
  authDomain: 'seng-513.firebaseapp.com',
  databaseURL: 'https://seng-513.firebaseio.com',
  projectId: 'seng-513',
  storageBucket: 'seng-513.appspot.com',
  messagingSenderId: '80908029198',
  appId: '1:80908029198:web:1d9a83e216706c1f085b5f',
  measurementId: 'G-THXM09W8DF',
});

export const DB_PATHS = {
  EVENTS: 'events',
  USERS: 'users',
  EVENT_USERS: 'event_users',
  EVENT_COMMENTS: 'event_comments',
  METADATA: 'metadata',
  NOTIFICATIONS: 'user_notifications',
};

export function getDb(): app.firestore.Firestore {
  return firebase.firestore();
}

export function getAuth(): app.auth.Auth {
  return firebase.auth();
}

export function getStorage() {
  return firebase.storage().ref();
}

export function makeLoginPopup() {
  return getAuth()
    .signInWithRedirect(new app.auth.GoogleAuthProvider())
    .then();
}

export function uploadPhotoToFirestore(
  e: React.ChangeEvent<HTMLInputElement>,
  uid: string,
): Promise<string> {
  if (e.target.files === null || e.target.files.length !== 1) {
    return Promise.resolve('');
  }

  const id = `${v4()}${uid}`;
  const file = e.target.files[0];

  const storageRef = getStorage().child(id);
  return storageRef.put(file).then(() => {
    return storageRef.getDownloadURL();
  });
}
