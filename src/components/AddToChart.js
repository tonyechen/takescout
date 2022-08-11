import React from 'react';
import { useRecoilState } from 'recoil';
import { shoppingCart } from '../atom/cart';

const AddToChart = ({food, restaurantRef}) => {
    const [cart, setCart] = useRecoilState(shoppingCart);

    return (
        <button onClick={() => {
            setCart([...cart, { ...food, restaurantRef: restaurantRef}]);
        }}
        className="bg-gray-200 hover:opacity-70">Add to Cart</button>
    );
};

export default AddToChart;
