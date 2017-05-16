const firebase = require('firebase');

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
});

firebase.auth().signInWithEmailAndPassword(process.env.FIREBASE_USERNAME, process.env.FIREBASE_PASSWORD)
  .catch((e) => console.error('Login error:', e));

const db = firebase.database();

module.exports = db;
