import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCQ-6Fvv6mescQcecS-6ppd7Cvu18DbAY0",
    authDomain: "clone-8ce9f.firebaseapp.com",
    projectId: "clone-8ce9f",
    storageBucket: "clone-8ce9f.appspot.com",
    messagingSenderId: "651377657431",
    appId: "1:651377657431:web:ca572afd1ec6be58678512",
    measurementId: "G-EB9FSV3CHG"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };