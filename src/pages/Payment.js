/* import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from '../axios';
import React, { useEffect, useState } from 'react';
import CurrencyFormat from '../components/CurrencyFormat';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from '../CheckoutProduct';
import './Payment.css';
import { db } from './firebase';
import Button from '../Button';
import {
    useAuthUser,
    useShoppingCart,
    getShoppingCartQuantity,
    getShoppingCartSum
} from './store'; */

export const Payment = () => {

    /* const authUser = useAuthUser();
    const shoppingCart = useShoppingCart();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true); */

    /* useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe only accepts cent as currency unit for input amount
                url: `/payments/create?total=${parseInt(getShoppingCartSum(shoppingCart) * 100)}`
            });
            setClientSecret(response.data.clientSecret);
        };

        getClientSecret();
    }, [shoppingCart]);

    console.log('Client secret >>>> ', clientSecret);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        try {
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });
            db
              .collection("authUsers")
              .doc(authUser?.uid)
              .collection("orders")
              .doc(payload.paymentIntent.id)
              .set({
                  shoppingCart: shoppingCart,
                  amount: payload.paymentIntent.amount,
                  created: payload.paymentIntent.created
              });

            setSucceeded(true);
            setError(null);

            navigate('/orders', { replace: true });
        } catch (error) {
            console.error('ERROR HAS OCCURRED', error);
        } finally {
            console.log("Finally setProcessiong to false");
            setProcessing(false);
        }

    };

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout ({<Link to='/checkout'>{getShoppingCartQuantity(shoppingCart)} items</Link>})
                </h1>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{authUser?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {shoppingCart.map(item => (
                            <CheckoutProduct
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                image={item.image}
                                quantity={item.quantity}
                            />
                        ))}
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment__priceContainer'>
                                <h3>Order Total: <CurrencyFormat price={getShoppingCartSum(shoppingCart)} /></h3>
                                <Button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    ) */
};
