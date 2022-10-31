import Header from "./Header.js";
import Home from "./Home.js";
import Checkout from "./pages/Checkout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import { useEffect, useRef } from 'react';
import { auth, addProduct } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';
import { setCurrentUser, useShoppingCart } from './store';

const promise = loadStripe('pk_test_51LBxovAczuSx9NaantjDoChzPMfN9Xz4FsZjpRwmVwnuIDUIVFxiFOMyD066RxmhkGitDNaFZLLSxYLNmMtEzm3b005rgUhRoI');

function App() {

    const shoppingCart = useShoppingCart();

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            authUser
                ? setCurrentUser(authUser)
                : setCurrentUser(null);
        });
    }, []);

    useEffect(() => {
      sessionStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
    }, [shoppingCart]);

    return (
        <Router>
            <div className="app">
                <button onClick={addProduct}>Add Product</button>
                <Routes>
                    <Route path="/" element={<><Header /><Home /></>} />
                    {/* <Route path="/orders" element={<><Header /><Orders /></>} /> */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/checkout" element={<><Header /><Checkout /></>} />
                    {/* <Route path='/payment' element={<><Header /><Elements stripe={promise}><Payment /></Elements></>} /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;