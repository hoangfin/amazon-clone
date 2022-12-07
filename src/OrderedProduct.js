import React from 'react';
import CurrencyFormat from './components/CurrencyFormat';
import './OrderedProduct.css';

function OrderedProduct({ id, image, title, price, quantity, isGift }) {
  return (
    <div className='ordered-product'>
            <div className='ordered-product__image-container'>
                <img src={image} />
            </div>

            <div className='ordered-product__info'>
                <p className='ordered-product__title'>{title}</p>

                <div>
                    <span className='ordered-product__gift'>
                        <input type='checkbox' checked={isGift} disabled /> This is a gift
                    </span>
                </div>

                <CurrencyFormat price={price} />

                <div>
                    <span className='ordered-product__quantity'>Quantity: {quantity}</span>
                </div>
            </div>
        </div>
  )
}

export default OrderedProduct;