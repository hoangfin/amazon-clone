import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Checkout, Home, Login, OrderHistory, Payment, Product, Search } from "pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "stores";

const stripePromise = loadStripe(
    "pk_test_51LBxovAczuSx9NaantjDoChzPMfN9Xz4FsZjpRwmVwnuIDUIVFxi" +
    "FOMyD066RxmhkGitDNaFZLLSxYLNmMtEzm3b005rgUhRoI"
);

export default function App() {

    return (
        <>
            <Router basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/products/:id" element={<Product />} />
                    <Route path="/order-history" element={<OrderHistory />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/checkout" element={<Checkout />} />

                    <Route
                        path="/payment"
                        element={
                            <Elements stripe={stripePromise}>
                                <Payment />
                            </Elements>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}