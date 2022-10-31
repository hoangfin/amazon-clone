import React, { useState, useRef } from 'react';
import Button from './Button';
import CurrencyFormat from './CurrencyFormat';
import styles from './product.module.css';
import QuantitySelect from './components/QuantitySelect';
import ProductImage from './components/ProductImage';
import { Rating } from '@mui/material';
import { addToShoppingCart } from './store';

function Product(product) {

    const quantityRef = useRef(product.quantity || 1);

    const updateQuantity = quantity => quantityRef.current = quantity;

    return (
        <div className={styles.container}>
            <ProductImage src={product.image} alt="" />

            <div className={styles.info}>
                <div>
                    <p className={styles.title}>{product.title}</p>

                    <Rating readOnly value={product.rating} precision={0.1} size="small" />

                    <CurrencyFormat price={product.price} />

                    <QuantitySelect value={quantityRef.current} onChange={updateQuantity} />
                </div>

                <Button onClick={e => addToShoppingCart({...product, quantity: quantityRef.current})}>
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}

export default Product;