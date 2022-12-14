import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "features/auth";
import { CartContext } from "features/cart";
import { Home, Login, Search, Orders, Checkout, Products, Payment } from "pages";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
    "pk_test_51LBxovAczuSx9NaantjDoChzPMfN9Xz4FsZjpRwmVwnuIDUIVFxi" +
    "FOMyD066RxmhkGitDNaFZLLSxYLNmMtEzm3b005rgUhRoI"
);

function App() {

    return (
        <>
            <AuthContext />
            <CartContext
                cartValue={JSON.parse(localStorage.getItem("cart")) || []}
            />

            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/products/:id" element={<Products />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route
                        path="/payment"
                        element={
                            <Elements stripe={promise}>
                                <Payment />
                            </Elements>
                        }
                    />
                </Routes>

            </Router>
        </>
    );
}

export default App;