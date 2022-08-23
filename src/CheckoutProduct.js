import React, { useRef } from 'react';
import './CheckoutProduct.css';
import CurrencyFormat from './CurrencyFormat';
import Select from './Select';
import { useStateValue } from './StateProvider';

function CheckoutProduct({ id, image, title, price, quantity }) {

    const [{ basket }, dispatch] = useStateValue();
    const options = ['0 (Delete)', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];

    const removeFromBasket = e => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        });
    };

    const updateQuantity = e => dispatch({
        type: 'UPDATE_QUANTITY',
        id: id,
        quantity: parseInt(e)
    });

    const optionChangeHandler = selectedOption => {
        if (selectedOption === '0 (Delete)') {
            removeFromBasket();
        } else {
            updateQuantity(selectedOption);
        }
    };

    return (
        <div className='checkout-product'>
            <div className='checkout-product__image-container'>
                <img src={image} />
            </div>

            <div className='checkout-product__info'>
                <p className='checkout-product__title'>{title}</p>
                <small className='checkout-product__gift'>
                    <input type='checkbox' /> This is a gift <a href=''>Learn more</a>
                </small>
                <CurrencyFormat price={price} />
                <div className='checkout-product__action'>
                    <Select options={options} initSelectedOption={quantity} onChange={optionChangeHandler} />
                    |
                    <input type='submit' value='Delete' onClick={removeFromBasket} />
                    |
                    <input type='submit' value='Save for later' />
                    |
                    <input type='submit' value='Compare with similar items' />
                </div>
            </div>
        </div>
    )
}

export default CheckoutProduct;