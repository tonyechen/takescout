import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex justify-between bg-orange-300 text-white h-[3rem] pl-[1rem] align-middle">
            <Link to="/">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/ZDF_logo%21_Logo_2021.svg/1200px-ZDF_logo%21_Logo_2021.svg.png"
                    alt="company logo"
                    className="w-[6rem] h-[3rem]"
                />
            </Link>

            <div className="flex align-middle">
                <Tabs to="/about" name="About" />
                <Tabs to="/login" name="Login/Signup" />
            </div>
        </nav>
    );
};

const Tabs = (props) => {
    return (
        <Link to={props.to} className="flex items-center px-[1rem] h-auto hover:bg-yellow-200">
            <p className='h-min'>{props.name}</p>
        </Link>
    );
};

export default Navbar;
