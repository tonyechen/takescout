import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../firebase';
import { useNavigate } from 'react-router-dom';
import getPlaces from '../lib/getPlaces';
import { debounce } from 'lodash';
import { userTypeState, userInfo } from '../atom/userInfo';
import { useRecoilState } from 'recoil';
import { db } from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

const Signup_restaurant = () => {
    const navigate = useNavigate();
    const [displaySuggestion, setDisplaySuggestion] = useState(false);
    const [placeSuggestions, setPlaceSuggestions] = useState(null);
    const [userAddress, setUserAddress] = useState(null);

    const suggestPlaces = debounce(async () => {
        let place = document.getElementById('search_address').value;

        const suggestions = await getPlaces(place);
        setPlaceSuggestions(suggestions);

        console.log(suggestions);
    }, 500);

    const handleSubmit = (e) => {
        e.preventDefault();

        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const restaurant_name =
            document.getElementById('restaurant_name').value;

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                console.log(auth);

                const PartnerColRef = collection(db, 'Partners');

                // add info to firestore
                const partnerInfo = {
                    first_name: firstName,
                    last_name: lastName,
                    address: userAddress,
                    email: email,
                    restaurant_name: restaurant_name,
                    user_type: 'partner',
                };

                // create Partner
                setDoc(doc(PartnerColRef, auth.user.uid), partnerInfo);

                window.localStorage.setItem('user_type', 'restaurant');
                window.localStorage.setItem('uid', auth.user.uid);

                navigate('/');
            })
            .catch((e) => alert(e.message));
    };

    const handleAddress = (e, place) => {
        setDisplaySuggestion(false);
        setUserAddress(place.properties);

        let search_address = document.getElementById('search_address');
        search_address.value = place.properties.formatted;

        let address_line = document.getElementById('address_line');
        let city = document.getElementById('city');
        let state = document.getElementById('state');
        let zipCode = document.getElementById('zip_code');
        let country = document.getElementById('country');

        address_line.value =
            place.properties.housenumber + ' ' + place.properties.street;
        city.value = place.properties.city;
        state.value = place.properties.state_code;
        zipCode.value = place.properties.postcode;
        country.value = place.properties.country;
    };

    return (
        <div className="flex py-[1rem] justify-center">
            <div className="flex flex-col bg-slate-100 p-10 rounded-2xl shadow-zinc-500 shadow-xl max-w-[80%] md:max-w-[500px]">
                <h1 className="text-2xl m-auto">Restaruant Partner Sign up</h1>
                <br />
                <form
                    className="flex flex-col "
                    onSubmit={(e) => handleSubmit(e)}
                >
                    {/* Name */}
                    <div className="flex justify-between w-[100%]">
                        <div className="w-[45%]">
                            <label for="first_name">First Name</label>
                            <br />
                            <input
                                required
                                type="text"
                                id="first_name"
                                className="rounded w-[100%] bg-white"
                            />
                        </div>
                        <div className="w-[45%]">
                            <label for="last_name">Last Name</label>
                            <input
                                required
                                type="text"
                                id="last_name"
                                className="rounded w-[100%]"
                            />
                        </div>
                    </div>
                    <br />

                    <label for="email">Email</label>
                    <input
                        required
                        type="text"
                        id="email"
                        className="rounded"
                    />
                    <br />

                    <label for="restaurant_name">Restaurant Name</label>
                    <input
                        required
                        type="text"
                        id="restaurant_name"
                        className="rounded"
                    />
                    <br />

                    {/* Address */}
                    <h1>Restaruant Address</h1>
                    <div className="relative">
                        <input
                            type="text"
                            id="search_address"
                            placeholder="&#128269;Search For Address..."
                            onChange={suggestPlaces}
                            onFocus={() => {
                                setDisplaySuggestion(true);
                            }}
                            className="w-[100%]"
                        />
                        <div
                            id="address_suggestion"
                            className="absolute bg-white shadow w-[100%] "
                        >
                            {displaySuggestion &&
                                (placeSuggestions && placeSuggestions.length ? (
                                    placeSuggestions.map((place, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="hover:bg-slate-300 cursor-pointer border border-y-grey px-2 py-1"
                                                onClick={(e) =>
                                                    handleAddress(e, place)
                                                }
                                            >
                                                {place.properties.formatted}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div>No Results Found</div>
                                ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 flex flex-col w-[100%]">
                            <label for="address_line">Address Line</label>
                            <input
                                type="text"
                                id="address_line"
                                disabled
                                required
                            />
                        </div>

                        <div className="mr-2">
                            <label for="city">City</label>
                            <input
                                type="text"
                                id="city"
                                className="w-[100%]"
                                disabled
                            />
                        </div>

                        <div className="">
                            <label for="state">State</label>
                            <input
                                type="text"
                                id="state"
                                className="w-[100%]"
                                disabled
                                required
                            />
                        </div>

                        <div className="col-span-2 flex flex-col w-[100%]">
                            <label for="zip_code">Postal/Zip Code</label>
                            <input
                                type="text"
                                id="zip_code"
                                disabled
                                required
                            />
                        </div>

                        <div className="col-span-2 flex flex-col w-[100%]">
                            <label for="country">Country</label>
                            <input type="text" id="country" disabled required />
                        </div>
                    </div>
                    <br />

                    {/* Password */}
                    <label for="password">Password</label>
                    <input
                        required
                        type="password"
                        id="password"
                        className="rounded"
                    />
                    {/* <label for="confirm_password">Confirm Password</label>
                    <input
                        required
                        type="password"
                        id="confirm_password"
                        className="rounded"
                    />
                     */}

                    <br />
                    <input
                        type="submit"
                        className="rounded-xl cursor-pointer bg-orange-300 px-5 py-2 w-[100%] hover:opacity-75"
                    />
                </form>
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

export default Signup_restaurant;
