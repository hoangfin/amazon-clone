import React from 'react';
import './Order.css';
import moment from 'moment';
import CurrencyFormat from './CurrencyFormat';
import OrderedProduct from './OrderedProduct';

function Order({ order }) {
  return (
    <div className='order'>
        <h2>Order <i>{order.id}</i></h2>
        <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
        <p className='order__id'>
            <small></small>
        </p>
        {order.data.basket?.map(item => (
            <OrderedProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
            />
        ))}
        <hr />
        <h3 className='order__total'>Order Total: <CurrencyFormat price={order.data.amount / 100} /></h3>

    </div>
  )
}

export default Order;