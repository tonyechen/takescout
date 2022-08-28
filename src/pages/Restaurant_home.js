import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
} from 'firebase/firestore';
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
                getDocs(
                    query(
                        collection(restaurant_doc_ref, 'orders'),
                        orderBy('time', 'desc')
                    )
                ).then((res) => {
                    setOrders(res.docs);
                });
            });
        });
    }, [restaurantID]);

    const handleFinishedOrder = (orderDocRef) => {
        console.log('yay');
    }

    return (
        <div>
            {orders &&
                orders.map((order) => {
                    console.log(order.data());
                    return (
                        <>
                            <p>{order.data().items[0].customer}</p>
                            <p>{order.data().items[0].type}</p>
                            <p>
                                {new Date(
                                    order.data().time.seconds
                                ).toTimeString()}
                            </p>
                            <div className="grid grid-cols-3">
                                {order.data().items.map((item) => {
                                    return (
                                        <div>
                                            <img
                                                src={item.food.image}
                                                alt=""
                                                className="w-40 h-40 object-cover"
                                            />
                                            <p>{item.food.name}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <button
                                className="px-5 py-2 bg-green-300 rounded-2xl"
                                onClick={() =>
                                    handleFinishedOrder(
                                        order.data().items[0].orderDocRef
                                    )
                                }
                            >
                                finished
                            </button>
                            <hr />
                        </>
                    );
                })}
        </div>
    );
};

export default Restaurant_home;
