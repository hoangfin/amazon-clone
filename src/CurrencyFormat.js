import React from 'react';
import './CurrencyFormat.css';

function CurrencyFormat({ price }) {

    const [whole, fraction] = price?.toFixed(2).split('.');

    return (
        <p className='currency-format'>
            <span className='currency-format__symbol'>$</span>
            <span className='currency-format__whole'>{whole}</span>
            <span className='currency-format__fraction'>{fraction}</span>
        </p>
    )
}

export default CurrencyFormat;