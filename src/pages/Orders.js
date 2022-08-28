import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { sortBy } from 'lodash';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userUID } from '../atom/userInfo';
import Order from '../components/Order';
import { db } from '../firebase';

const Orders = () => {
    const uid = useRecoilValue(userUID);
    const [orders, setOrders] = useState(null);

    const userOrdersColRef = collection(db, 'Users', uid, 'orders');

    useEffect(() => {
        getDocs(query(userOrdersColRef, orderBy('time', 'desc'))).then((res) => {
            setOrders(res.docs);
            console.log(res.docs);
        });
    }, []);

    return (
        <div className="max-w-[900px] m-auto p-5">
            {orders?.map((order) => {
                return <Order order={order.data()} id={order.id}/>;
            })}
        </div>
    );
};

export default Orders;
