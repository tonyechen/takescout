import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/ZDF_logo%21_Logo_2021.svg/1200px-ZDF_logo%21_Logo_2021.svg.png"
                alt="company logo"
                className="navbar__logo"
            />
            <div className="navbar__tabs">
                <Link to="/login" className="navbar__tab">
                    About
                </Link>
                <Link to="/login" className="navbar__tab">
                    Login / Signup
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
