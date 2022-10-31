import React from 'react';
import './Subtotal.css';
import { getBasketTotal, getBasketQuantity } from './reducer';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useCurrentUser, useShoppingCart } from './store';

function Subtotal() {

    const navigate = useNavigate();
    const currentUser = useCurrentUser();
    const shoppingCart = useShoppingCart();

    return (
        <div className='subtotal'>
            <p>
                Subtotal ({getBasketQuantity(shoppingCart)} items): <strong>&#36;{getBasketTotal(shoppingCart).toFixed(2)}</strong>
            </p>
            <small className='subtotal__gift'>
                <input type='checkbox' /> This order contains a gift
            </small>

            <Button type='button' onClick={e => navigate(currentUser ? '/payment' : '/login')}>Proceed to Checkout</Button>
        </div>
    )
}

export default Subtotal;