import React, { useState } from 'react';
import Button from './Button';
import CurrencyFormat from './CurrencyFormat';
import './Product.css';
import Select from './Select';
import { useStateValue } from './StateProvider';

function Product({ id, title, image, price, rating }) {

    const [{ basket }, dispatch] = useStateValue();
    const [quantity, setQuantity] = useState(1);
    const options = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];

    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: { id, title, image, quantity, price, rating }
        });
    }

    return (
        <div className='product'>
            <div className='product__image-container'>
                <img src={image} alt='' />
            </div>

            <div className='product__info'>
                <div>
                    <p className='product__title'>{title}</p>

                    <div className='product__rating'>
                        <span className={`icon icon-star-small-${rating}`}></span>
                    </div>

                    <CurrencyFormat price={price} />
                </div>

                <Select options={options} onChange={selectedOption => setQuantity(parseInt(selectedOption))} />

                <Button onClick={addToBasket}>Add to Cart</Button>
            </div>

        </div>
    )
}

export default Product;