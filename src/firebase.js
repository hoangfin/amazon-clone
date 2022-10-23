import { initializeApp } from "firebase/app";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut as logOut,
    createUserWithEmailAndPassword
} from "firebase/auth";

import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCQ-6Fvv6mescQcecS-6ppd7Cvu18DbAY0",
    authDomain: "clone-8ce9f.firebaseapp.com",
    projectId: "clone-8ce9f",
    storageBucket: "clone-8ce9f.appspot.com",
    messagingSenderId: "651377657431",
    appId: "1:651377657431:web:ca572afd1ec6be58678512",
    measurementId: "G-EB9FSV3CHG"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// uncomment this to use real firestore
// const db = getFirestore(firebaseApp);

// use firestore emulator instead of real one
const db = getFirestore();
connectFirestoreEmulator(db, "localhost", 8080);

export { db, auth };

export const signInWithEmail = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
        auth, email, password
    );
    return userCredential;
};

export const signOut = async () => {
    await logOut(auth);
};

export const registerWithEmail = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
        auth, email, password
    );
    return userCredential;
};