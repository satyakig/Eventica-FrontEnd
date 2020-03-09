import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

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
  COMMENTS: 'comments',
};

export function getDb(): app.firestore.Firestore {
  return firebase.firestore();
}

export function getAuth(): app.auth.Auth {
  return firebase.auth();
}

export function makeLoginPopup() {
  return getAuth()
    .signInWithPopup(new app.auth.GoogleAuthProvider())
    .then();
}
