import { db } from "config/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

// get products by using Firestore APIs
const fetchProductsFirestoreImpl = async (category, title) => {
    const q = query(collection(db, "products"), orderBy("id"), limit(12));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
};

// abstract away from specific API/Lib providers with
// facade pattern for the sake of flexibility
export const fetchProducts = async () => {
    return await fetchProductsFirestoreImpl();
};