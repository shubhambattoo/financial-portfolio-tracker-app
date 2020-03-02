/* eslint-disable */
import firebase from 'firebase/app';
import firestore from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASEAPIKEY,
  authDomain: 'financial-portfolio-tracker.firebaseapp.com',
  databaseURL: 'https://financial-portfolio-tracker.firebaseio.com',
  projectId: 'financial-portfolio-tracker',
  storageBucket: 'financial-portfolio-tracker.appspot.com',
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// export the firestore db
export default firebaseApp.firestore();
