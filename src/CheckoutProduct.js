import React, { useRef } from 'react';
import './CheckoutProduct.css';
import CurrencyFormat from './components/CurrencyFormat';
import Select from 'components';

const selectOptions = Array.from({ length: 9 }, (_, i) => i + 1);

function CheckoutProduct({ id, image, title, price, quantity }) {

    /* const shoppingCart = useShoppingCart();

    const removeFromBasket = e => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        });
    };

    const updateQuantity = e => {};

    const optionChangeHandler = selectedOption => {
        if (selectedOption === '0 (Delete)') {
            removeFromBasket();
        } else {
            updateQuantity(selectedOption);
        }
    }; */

    return (
        <div className='checkout-product'>

            {/* <div className='checkout-product__image-container'>
                <img src={image} />
            </div>

            <div className='checkout-product__info'>
                <p className='checkout-product__title'>{title}</p>
                <small className='checkout-product__gift'>
                    <input type='checkbox' /> This is a gift <a href=''>Learn more</a>
                </small>
                <CurrencyFormat price={price} />
                <div className='checkout-product__action'>
                    <Select
                        label="Qty:"
                        defaultValue={quantity}
                        options={selectOptions}
                        onChange={optionChangeHandler}
                    />
                    |
                    <input type='submit' value='Delete' onClick={removeFromBasket} />
                    |
                    <input type='submit' value='Save for later' />
                    |
                    <input type='submit' value='Compare with similar items' />
                </div>
            </div> */}
        </div>
    )
}

export default CheckoutProduct;