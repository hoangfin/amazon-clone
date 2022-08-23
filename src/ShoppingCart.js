import React from 'react';
import './ShoppingCart.css';
import { useStateValue } from './StateProvider';
import { getBasketQuantity } from './reducer';

function ShoppingCart() {

    const [{ basket, user }, dispatch] = useStateValue();

    return (
        <div className='cart'>
            <span className='cart__icon'></span>
            <span className='cart__count'>{getBasketQuantity(basket)}</span>
        </div>
    )
}

export default ShoppingCart;