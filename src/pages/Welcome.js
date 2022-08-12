import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div className="overflow-x-hidden flex justify-center">
            <div className="w-[100%] fixed top-[20%] flex justify-center">
                <Link className="text-2xl bg-orange-400 text-white px-5 py-2 rounded-2xl" to="/login">
                    Start Scouting
                </Link>
            </div>

            <img
                src="/TakeScout_Logo.jpg"
                alt="takeScout"
                className=" min-w-[900px]"
            />
        </div>
    );
};

export default Welcome;
