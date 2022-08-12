import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from '../axios';
import { Link, useNavigate } from 'react-router-dom';
import { shoppingCart } from '../atom/cart';
import { useRecoilValue } from 'recoil';
import CheckoutForm from '../components/CheckoutForm';
import Food from '../components/Food';

const stripePromise = loadStripe(
    'pk_test_51LVUkpHQPc8rJqiS8RE0962BcblVleqeVzMoL8U518s1ACJIOCxZ6oMfmzJOHBYnWZ3AHkzwhXTAPp2w3hHS26nV00BiVM44lQ'
);

const Payment = () => {
    const navigate = useNavigate();
    const cart = useRecoilValue(shoppingCart);
    const [, setTotal] = useState(0.0);
    const [clientSecret, setClientSecret] = useState('');

    let total = 0.0;
    cart.forEach((item) => (total += parseFloat(item.price)));

    useEffect(() => {
        const getClientSecret = async (total) => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a curencies subunits
                url: `/payments/create?total=${total * 100}`,
            });
            console.log('client secrets:', response);
            setClientSecret(response.data.clientSecret);
        };

        getClientSecret(total);
    }, [cart]);

    useEffect(() => {
        // generate special stripe secret which allows us to charge a customer
    }, [cart]);

    const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret,
    };

    return (
        <div className="max-w-[900px] m-auto">
            <div className="">
                {cart.map((item, i) => {
                    return (
                        <>
                            <div className="flex justify-between">
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                            </div>
                            <hr />
                        </>
                    );
                })}
                <div className="flex justify-between">
                    <h1 className='text-xl'>Order total:</h1>
                    <p>{total}</p>
                </div>
            </div>
            <div className="mt-10">
                {clientSecret && (
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </div>
    );
};

export default Payment;
