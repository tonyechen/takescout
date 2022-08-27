import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import React from 'react';
import NavTab from './NavTab';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userUID } from '../atom/userInfo';

const RestaurantNav = () => {
    const navigate = useNavigate();
    const restaurantID = useRecoilValue(userUID);

    return (
        <nav className="flex justify-between sticky top-0 bg-orange-300 text-white h-[3rem] pl-[1rem] align-middle">
            <Link to="/">
                <div className="flex align-middle">
                    <h1 className="text-4xl">TakeScout</h1>
                </div>
            </Link>

            <div className="flex align-middle">
                <NavTab to="/about" name="About" />

                <button
                    onClick={() => {
                        signOut(auth);
                        navigate('/');
                    }}
                    className="flex items-center px-[1rem] h-auto hover:bg-yellow-200"
                >
                    <p>Sign out</p>
                </button>

                <NavTab to={`/restaurant/${restaurantID}`} name="Profile" />
            </div>
        </nav>
    );
};

export default RestaurantNav;
