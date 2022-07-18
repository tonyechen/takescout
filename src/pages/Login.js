import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase';

const Login = () => {
    let navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                console.log(auth);
                navigate('/');
            })
            .catch((e) => alert(e.message));
    }

    return (
        <div className="flex py-[5rem] justify-center">
            <div className="flex flex-col bg-slate-100 p-10 rounded-2xl shadow-zinc-500 shadow-xl">
                <h1 className="text-2xl m-auto">Login</h1>
                <br />
                <form className="" onSubmit={(e) => handleSubmit(e)}>
                    <label for="email">Email</label>
                    <br />
                    <input
                        required
                        type="text"
                        id="email"
                        className="rounded"
                    />
                    <br />
                    <br />
                    <label for="password">Password</label>
                    <br />
                    <input
                        required
                        type="password"
                        id="password"
                        className="rounded"
                    />
                    <br />
                    <br />
                    <input
                        type="submit"
                        className="rounded-xl cursor-pointer bg-orange-300 px-5 py-2 w-[100%] hover:opacity-75"
                    />
                </form>
                <h1 className="m-auto text-sm text-gray-500 mt-4">
                    don't have an account?
                </h1>
                <Link
                    to="/signup/user"
                    className="m-auto text-sm text-gray-500 underline"
                >
                    sign up to be a user
                </Link>
                <Link
                    to="/signup/restaurant"
                    className="m-auto text-sm text-gray-500 underline"
                >
                    sign up to be our partner
                </Link>
            </div>
        </div>
    );
};

export default Login;
