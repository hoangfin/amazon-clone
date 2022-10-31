import React from 'react';
import { useShoppingCart } from '../store';
import "./Checkout.css";
import CheckoutProduct from '../CheckoutProduct';
import Product from '../Product';
import Subtotal from "../Subtotal.js";

function Checkout() {

    const shoppingCart = useShoppingCart();

    return (
        <div className='checkout'>
            {shoppingCart.length === 0 ?
                <div>
                    <object className='checkout__empty-cart' type="image/svg+xml" data="https://m.media-amazon.com/images/G/01/cart/empty/animated/rolling-cart-desaturated._CB405694243_.svg">
                        <img alt="" src="https://m.media-amazon.com/images/G/01/cart/empty/animated/cart-fallback-desaturated._CB405682035_.svg" />
                    </object>
                    <h2 className='checkout__empty-cart-title'>Your Amazon Cart is empty</h2>
                </div>
            :
                <div className='checkout__container'>
                    <div className='checkout__left'>
                        <div className='checkout__shopping-details'>
                            <h1 className='checkout__title'>Shopping Cart</h1>
                            <ul className='checkout__product-list'>
                                {shoppingCart.map(item => (
                                    <li key={item.id} className='checkout__product-list-item'>
                                        <CheckoutProduct
                                            id={item.id}
                                            image={item.image}
                                            title={item.title}
                                            price={item.price}
                                            quantity={item.quantity}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className='checkout__right'>
                        <Subtotal />
                    </div>
                </div>
            }
        </div>
    )
}

export default Checkout;