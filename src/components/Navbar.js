import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authState } from '../atom/auth';
import { useRecoilValue } from 'recoil';
import NavTab from './NavTab';
import { userTypeState } from '../atom/userInfo';
import UserNav from './UserNav';
import RestaurantNav from './RestaurantNav';

const Navbar = () => {
    const authentication = useRecoilValue(authState);
    const userType = useRecoilValue(userTypeState);

    return (
        <>
            {/* different nav bar based on user type */}
            {!authentication ? (
                <nav className="flex justify-between sticky top-0 bg-orange-300 text-white h-[3rem] pl-[1rem] align-middle">
                    <Link to="/">
                        <div className='flex align-middle'>
                            <h1 className="text-4xl">TakeScout</h1>
                        </div>
                    </Link>

                    <div className="flex align-middle">
                        <NavTab to="/about" name="About" />
                        {authentication || <NavTab to="/login" name="Login" />}
                        {authentication && (
                            <button
                                onClick={() => {
                                    signOut(auth);
                                }}
                                className="flex items-center px-[1rem] h-auto hover:bg-yellow-200"
                            >
                                <p>Sign out</p>
                            </button>
                        )}
                    </div>
                </nav>
            ) : userType === 'user' ? (
                <UserNav />
            ) : (
                <RestaurantNav />
            )}
        </>
    );
};

export default Navbar;
