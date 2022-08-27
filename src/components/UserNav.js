import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import React from 'react';
import NavTab from './NavTab';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { shoppingCart } from '../atom/cart';

const UserNav = () => {
    const [cart, setCart] = useRecoilState(shoppingCart);

    const navigate = useNavigate();

    return (
        <nav className="flex justify-between sticky top-0 bg-orange-300 text-white h-[3rem] pl-[1rem] align-middle">
            <Link to="/">
                <div className="flex align-middle">
                    <h1 className="text-4xl">TakeScout</h1>
                </div>
            </Link>

            <div className="flex align-middle">
                <NavTab to="/about" name="About" />

                <NavTab to="/orders" name="Orders" />

                {/* Shopping Cart */}
                <button
                    onClick={() => {
                        navigate('/cart');
                    }}
                    className="flex items-center px-[1rem] h-auto hover:bg-yellow-200"
                >
                    <p>Shopping Cart: {cart.length}</p>
                </button>

                {/* Signout Button */}
                <button
                    onClick={() => {
                        signOut(auth);
                        navigate('/');
                    }}
                    className="flex items-center px-[1rem] h-auto hover:bg-yellow-200"
                >
                    <p>Sign out</p>
                </button>
            </div>
        </nav>
    );
};

export default UserNav;
