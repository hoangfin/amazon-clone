import React, { useEffect, useState } from 'react';
import './Orders.css';
import { db } from './firebase';
import Order from './Order';
import { useAuthUser } from './store';

function Orders() {

    const authUser = useAuthUser();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (authUser) {
            db
              .collection('authUsers')
              .doc(authUser?.uid)
              .collection('orders')
              .orderBy('created', 'desc')
              .onSnapshot(snapshot => {
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })));
              }
            );
        } else {
            setOrders([]);
        }


    }, [authUser]);

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map(order => (
                    <Order key={order.id} order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders;