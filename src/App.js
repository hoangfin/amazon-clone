import './App.css';
import Header from "./Header.js";
import Home from "./Home.js";
import Checkout from "./Checkout.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe('pk_test_51LBxovAczuSx9NaantjDoChzPMfN9Xz4FsZjpRwmVwnuIDUIVFxiFOMyD066RxmhkGitDNaFZLLSxYLNmMtEzm3b005rgUhRoI');
console.log("loadStripe invoked");

function App() {

  const [{ basket, user }, dispatch ] = useStateValue();

  // Will only run once when the app component loads...
  useEffect(() => {
      auth.onAuthStateChanged(authUser => {

        if (authUser) { // user has just logged in
          dispatch({
            type: 'SET_USER',
            user: authUser
          });
        } else {  // user has just logged out
          dispatch({
            type: 'SET_USER',
            user: null
          });
        }

      });
  }, []);

  useEffect(() => {
    sessionStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<><Header /><Home /></>} />
          <Route path="/orders" element={<><Header /><Orders/></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<><Header /><Checkout /></>} />
          <Route path='/payment' element={<><Header /><Elements stripe={promise}><Payment /></Elements></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;