import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

// use firestore emulator instead of real one
/* export const firestore = getFirestore();
connectFirestoreEmulator(firestore, "localhost", 8080); */