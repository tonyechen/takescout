import React from 'react';
import { Link } from 'react-router-dom';

const Signup_user = () => {
    return (
        <div className="flex py-[5rem] justify-center">
            <div className="flex flex-col bg-slate-100 p-10 rounded-2xl shadow-zinc-500 shadow-xl">
                <h1 className="text-2xl m-auto">User Sign up</h1>
                <br />
                <form className="">
                    <label for="email">Email</label>
                    <br />
                    <input type="text" id="email" className="rounded" />
                    <br />
                    <br />
                    <label for="password">Password</label>
                    <br />
                    <input type="password" id="password" className="rounded" />
                    <br />
                    <br />
                </form>
                <button className="rounded-xl cursor-pointer bg-orange-300 px-5 py-2 hover:opacity-75">
                    Submit
                </button>
                <br />
                <Link
                    to="/login"
                    className="m-auto text-sm text-gray-500 underline"
                >
                    back
                </Link>
            </div>
        </div>
    );
};

export default Signup_user;
