import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCuKnwAKbLOQpTwIVsqgMEgJGKzUMczvJk",
  authDomain: "insta-clone-7d894.firebaseapp.com",
  databaseURL: "https://insta-clone-7d894.firebaseio.com",
  projectId: "insta-clone-7d894",
  storageBucket: "insta-clone-7d894.appspot.com",
  messagingSenderId: "634748639065",
  appId: "1:634748639065:web:1d06bd651bc15f88f75e48",
  measurementId: "G-4W9J0507MB",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
