import { collection, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo, userUID } from '../atom/userInfo';
import Food from '../components/Food';
import { db } from '../firebase';

const User_home = () => {
    const user = useRecoilValue(userInfo);
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            const restaurantsColRef = collection(
                db,
                'Restaurants',
                user.address.country_code,
                'States',
                user.address.state,
                'Cities',
                user.address.city,
                'Restaurants'
            );

            getDocs(restaurantsColRef).then((res) => {
                console.log(res);
                setRestaurants(res.docs);
            });
        }
    }, [user]);

    return (
        <div className="flex justify-center w-[100%]">
            <div className="max-w-[900px]">
                {restaurants?.map((restaurant) => {
                    const restaurantData = restaurant.data();
                    const restaurantID = restaurant.id;
                    console.log(restaurantID);
                    console.log(restaurantData);
                    return (
                        <div
                            key={restaurantData.restaurant_name}
                            className="bg-gray-100 p-5  my-5 rounded-2xl shadow cursor-pointer"
                            onClick={() => {
                                navigate(`/restaurant/${restaurantID}`);
                            }}
                        >
                            <h1 className="text-2xl">
                                {restaurantData.restaurant_name}
                            </h1>
                            <h2>{restaurantData.address}</h2>
                            <h3>Featured Items:</h3>

                            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-[100%]">
                                {Array(3)
                                    .fill()
                                    .map((n, i) => {
                                        return (
                                            <div key={i}>
                                                {restaurantData.menu[i] && (
                                                    <Food
                                                        name={
                                                            restaurantData.menu[
                                                                i
                                                            ].name
                                                        }
                                                        image={
                                                            restaurantData.menu[
                                                                i
                                                            ].image
                                                        }
                                                        price={
                                                            restaurantData.menu[
                                                                i
                                                            ].price
                                                        }
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default User_home;
