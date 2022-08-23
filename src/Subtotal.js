import React from 'react';
import './Subtotal.css';
import { useStateValue } from './StateProvider';
import { getBasketTotal, getBasketQuantity } from './reducer';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function Subtotal() {

    const navigate = useNavigate();
    const [{ basket, user }, dispatch] = useStateValue();

    return (
        <div className='subtotal'>
            <p>
                Subtotal ({getBasketQuantity(basket)} items): <strong>&#36;{getBasketTotal(basket).toFixed(2)}</strong>
            </p>
            <small className='subtotal__gift'>
                <input type='checkbox' /> This order contains a gift
            </small>

            <Button type='button' onClick={e => navigate(user ? '/payment' : '/login')}>Proceed to Checkout</Button>
        </div>
    )
}

export default Subtotal;