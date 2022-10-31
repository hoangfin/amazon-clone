import { initializeApp } from "firebase/app";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut as logOut,
    createUserWithEmailAndPassword
} from "firebase/auth";

import { addDoc, connectFirestoreEmulator, doc, getFirestore, setDoc } from "firebase/firestore";

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
const db = getFirestore(firebaseApp);

// use firestore emulator instead of real one
/* const db = getFirestore();
connectFirestoreEmulator(db, "localhost", 8080); */

export { db, auth };

export const addProduct = async () => {
    console.log("addProduct invoked");
    try {
        await setDoc(doc(db, "products", "B0BC9DW9ZL"), {
            id: "B0BC9DW9ZL",
            title: "RJR Updated 3 in 1 Charging Station for Apple Devices, Self Adjusting Charging Dock for iWatch 8 7 6 SE 5 4 3 2 1, Built-in Charger Stand for iPhone Series AirPods Pro 3 2 1 (with 15W Adapter) Black",
            categories: ["Cell Phones & Accessories", "Accessories", "Chargers & Power Adapters", "Charging Stations"],
            price: 2799,
            rating: 3.9,
            overview: {
                "Brand": "RJR",
                "Connectivity Technology": "USB",
                "Connector Type": "USB Type C",
                "Special Feature": "Charging station for apple devices, 3 in 1 charging station for apple, charging station for apple, charging stand for apple, charging station for multiple devices apple, charger stand, charging station for apple watch AirPods iPhone, docking station for apple, smartwatch cables and chargers, nightstand charging station, Built-in charging station, Removable charging dock, 3 in 1 charger, Self Adjusting for Apple watch",
                "Color": "Black",
                "Input Voltage": "110 Volts (AC)",
                "Mounting Type": "No installation required",
            },
            feature: {
                "Latest Upgrade for iPhone Charging": "The upgraded design of this apple charging station features a durable connecter that rotate up to 70°, which is 30° more than other night charging stations. Easily unplug your phone from the charging connecter without cording about damage.",
                "Rugged Design for iPhone Station": "The phone holding portion of this phone charging station is reinforced with ribbed so your phone stays put. Even the larger phone models are supported and will not tip over, shake, or break. This charging dock is compatible with iPhone 14 Pro Max, iPhone 14 Pro, iPhone 13 Pro Max, iPhone 13 Pro, iPhone 12 Pro Max, iPhone 12 Pro.",
                "Self Adjusting and Strong Attachment for Apple Watch": "The watch charger has a special internal structure that can automatically adjust the charging position of the watch when you set it on to charge, no matter what watch size and case (38mm~49mm). Specially designed to help the watch stay cool while charging, it will help extend the life of your watch and offer a better charge.",
                "Silicone Watch Holder Supports Heavy Bands": "No need to remove your watch metal band before charging- the Silicone Watch Holder attachment of our watch charger can support heavy bands and will not fall off while charging. Compatible with Apple iWatch Ultra 49mm.",
                "PopGrip and Phone Case Friendly": "The RJR 3 in 1 charging station for Apple devices has a removable holder and is compatible with phone cases up to 5mm, even working with PopGrips and Popsockets. Charge your phone with accessories easily and quickly.",
                "Built-in Charging Cables": "All charging cables are built in for ease and durability. The charging dock has a built-in magnetic charger for the iWatch, as well as two built-in charger plugs for the iphone and AirPods. Just one 3-in-1 Charger stand can charge three devices at the same time!",
                "Universal Compatibility": "RJR cell phone charging station is compatible for all Apple devices. Compatible with iWatch series 8/7/6/SE/5/4/3/2/1 & Apple iWatch Ultra/Nike+/Sport/Edition/Hermès; Compatible with AriPods Pro 2/Pro/3/2/1; Compatible with iPhone 14 Pro Max, iPhone 14 Pro, iPhone 14, iPhone 13 iPhone 12 Pro Max, iPhone 12 Pro, iPhone 12, iPhone 12 mini, iPhone 11 Pro Max, iPhone 11 Pro, iPhone 11, iPhone SE (2nd generation), iPhone XS MAX, iPhone XS, iPhone XR, iPhone X, iPhone 8 Plus, iPhone 8, iPhone 7 Plus, iPhone 7, iPhone 6s Plus, iPhone 6s.",
                "What You Get": "The 3-in-1 bedside charging station includes a 15W adapter, a Type-C cable, a User manual, and a two-year warranty. This charging station is the perfect way to keep your desk or nightstand neat and tidy and eliminate multiple cords. It also makes a great gift for friends and family, and you can all enjoy the convenience of having your Apple devices fully charged when you wake up."
            },
            imageURLs: [
                "https://m.media-amazon.com/images/I/71WIPujeGuL._AC_SX425_.jpg",
                "https://m.media-amazon.com/images/I/71av5pADrLL._AC_SY606_.jpg",
                "https://m.media-amazon.com/images/I/71f2SJ76sGL._AC_SY606_.jpg",
                "https://m.media-amazon.com/images/I/71-hmYBGxHL._AC_SY606_.jpg",
                "https://m.media-amazon.com/images/I/71p59GHrgfL._AC_SY606_.jpg",
                "https://m.media-amazon.com/images/I/71A+RUGEATL._AC_SY606_.jpg"
            ],
            videoURL: "https://m.media-amazon.com/images/S/vse-vms-transcoding-artifact-us-east-1-prod/21120703-14c2-48c7-8bdc-6dbf0b96721b/default.jobtemplate.mp4.480.mp4"
        });
    } catch (error) {
        console.error(error);
    }

};

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