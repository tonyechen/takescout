import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { userInfo, userUID } from '../atom/userInfo';
import { useRecoilValue } from 'recoil';
import { db } from '../firebase';

const Restaurant_home = () => {
    const restaurantID = useRecoilValue(userUID);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getDoc(doc(db, 'Partners', restaurantID)).then((res) => {
            const restaurant_doc_ref = res.data().restaurant_doc_ref;
            onSnapshot(restaurant_doc_ref, (doc) => {
                console.log(doc.data());
                setOrders(doc.data().orders);
            });
        });
    }, [restaurantID]);

    return <div>
        {orders && orders.map((order) => {
            console.log(order);
            return <div>
                <img src={order.food.image} alt="" className='w-[200px] h-auto'/>
                <p>{order.customer}</p>
                <p>{order.address.address_line1}, {order.address.address_line2}</p>
                <p>{order.food.name}</p>
                <button className='px-5 py-2 bg-green-300 rounded-2xl'>finished</button>
            </div>
        })}
    </div>;
};

export default Restaurant_home;
