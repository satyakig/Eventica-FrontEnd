import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

let firebase;

export function initializeApp() {
  firebase = app.initializeApp({
    apiKey: 'AIzaSyDGt23yzVQmF0mdIqUilPLCGNjnpX_aaMM',
    authDomain: 'seng-513.firebaseapp.com',
    databaseURL: 'https://seng-513.firebaseio.com',
    projectId: 'seng-513',
    storageBucket: 'seng-513.appspot.com',
    messagingSenderId: '80908029198',
    appId: '1:80908029198:web:1d9a83e216706c1f085b5f',
    measurementId: 'G-THXM09W8DF',
  });
}

export function getDb() {
  return firebase.firestore();
}

export function getAuth() {
  return firebase.auth();
}

export function loginWithGoogle() {
  const provider = new app.auth.GoogleAuthProvider();
  getAuth().signInWithPopup(provider);
}

export function logout() {
  getAuth().signOut();
}
