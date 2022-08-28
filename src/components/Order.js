import React from 'react';
import { useEffect } from 'react';

const Order = (props) => {
    const dateObject = new Date(props.order.time.seconds * 1000);
    return (
        <div>
            <p>
                {dateObject.toDateString()} {dateObject.toTimeString()}
            </p>
            <p>Total: {props.order.total.toFixed(2)}</p>
            <div className="grid md:grid-cols-4 sm:grid-cols-2">
                {props.order.orders.map((item) => {
                    return (
                        <div className='min-content'>
                            <img
                                src={item.image}
                                alt=""
                                className="w-40 h-40 object-cover"
                            />
                            <p>{item.name}</p>
                        </div>
                    );
                })}
            </div>
            {!props.order.isComplete && <button className='bg-gray-300 px-8 py-2 rounded-xl'>Status</button>}
        </div>
    );
};

export default Order;
