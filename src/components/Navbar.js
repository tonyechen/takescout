import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/ZDF_logo%21_Logo_2021.svg/1200px-ZDF_logo%21_Logo_2021.svg.png"
                alt="company logo"
                className='navbar__logo'
            />
        </nav>
    );
};

export default Navbar;
