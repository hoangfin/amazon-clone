import React from 'react';
import './ShoppingCart.css';
import { getBasketQuantity } from './reducer';
import { useShoppingCart } from './store';

function ShoppingCart() {

    const shoppingCart = useShoppingCart();

    console.log(shoppingCart);

    return (
        <div className='cart'>
            <span className='cart__icon'></span>
            <span className='cart__count'>{getBasketQuantity(shoppingCart)}</span>
        </div>
    )
}

export default ShoppingCart;