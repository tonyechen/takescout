import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { shoppingCart } from '../atom/cart';
import Food from '../components/Food';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
    const [cart, setCart] = useRecoilState(shoppingCart);

    const [total, setTotal] = useState(0.0);

    useEffect(() => {
        let newTotal = 0.0;
        cart.forEach((item) => (newTotal += parseFloat(item.price)));
        console.log(newTotal);
        setTotal(newTotal);
    }, [cart]);

    return (
        <div className="grid sm:grid-cols-3 m-auto max-w-[900px] grid-cols-1">
            <div className="col-span-2">
                {cart.map((item, i) => {
                    return (
                        <div className="">
                            <Food
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                id={i}
                            />
                            <button
                                className="bg-red-500 text-white rounded px-10 py-2"
                                onClick={() => {
                                    let newCart = cart.filter((item, index) => {
                                        return index != i;
                                    });

                                    setCart(newCart);
                                }}
                            >
                                Remove Item
                            </button>
                        </div>
                    );
                })}
            </div>
            <div className="relative">
                <div className="sticky top-[3rem]">
                    <p className="text-xl mb-5">
                        Order Total: {total.toFixed(2)}
                    </p>

                    <Link
                        to="/checkout"
                        className="bg-gray-300 rounded-2xl px-5 py-2"
                    >
                        Checkout
                    </Link>

                    <p className="my-5">Deliver for someone else for a discount!</p>

                    <Link
                        to="/pairing"
                        className="bg-gray-300 rounded-2xl px-5 py-2 my-10"
                    >
                        I want to Deliver!
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
