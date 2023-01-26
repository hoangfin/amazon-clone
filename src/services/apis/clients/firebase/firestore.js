import { firestore } from "./config";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

export const getOrdersByEmail = async (email) => {
    if (!email) {
        return Promise.reject("email is undefined");
    }
    const q = query(collection(firestore, "orders"), where("orderedBy", "==", email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty
        ?   []
        :   querySnapshot.docs.map(doc => doc.data())
};

export const createOrder = async (orderID, order) => {
    await setDoc(doc(firestore, "orders", orderID), order);
};

export const createUser = async (id, user) => {
    await setDoc(doc(firestore, "users", id), user);
    return user;
};

export const getUserByID = async (userID) => {
    const docSnap = await getDoc(doc(firestore, "users", userID));
    return docSnap.data();
};

export const updateUser = async (userID, data) => {
    await updateDoc(doc(firestore, "users", userID), data);
};