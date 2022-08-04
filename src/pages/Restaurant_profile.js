import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userUID } from '../atom/userInfo';
import EditFood from '../components/EditFood';
import Food from '../components/Food';
import { db } from '../firebase';

const Restaurant_profile = () => {
    // global state value
    const currentUserID = useRecoilValue(userUID);

    // component state
    const restaurant_id = useParams().id;
    const [restaurant, setRestaurant] = useState(null);
    const [restaurantInfo, setRestaurantInfo] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [menu, setMenu] = useState([]);

    const navigate = useNavigate();

    // firebase references
    const restaurantInfoDocRef = doc(db, 'Partners', restaurant_id);

    const addMenuItem = (id, image, name, price, description) => {
        let newMenu = menu;
        newMenu[id] = {
            image: image,
            name: name,
            price: price,
            description: description,
        };
        setMenu(newMenu);
    };

    const handleSubmit = () => {
        const restaurantDocRef = restaurantInfo.restaurant_doc_ref;

        const filteredMenu = menu.filter((item) => {
            return Object.keys(item).length > 0;
        });

        setMenu(filteredMenu);

        setDoc(restaurantDocRef, { ...restaurant, menu: filteredMenu });
        setCanEdit(false);
    };

    // fetch the current restaurant
    useEffect(() => {
        // fetch restaurant data
        getDoc(restaurantInfoDocRef)
            .then((res) => {
                const data = res.data();
                setRestaurantInfo(data);

                const restaurantDocRef = data.restaurant_doc_ref;

                // fetch restaurant menu
                getDoc(restaurantDocRef).then((res) => {
                    const restaurantData = res.data();

                    setRestaurant(restaurantData);

                    if (restaurantData?.menu) {
                        setMenu(restaurantData.menu);
                    }
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [restaurant_id]);

    return (
        <div className="flex flex-wrap justify-center mt-[2rem]">
            <div className="flex flex-col text-center">
                <h1 className="text-2xl m-auto">
                    {restaurantInfo?.restaurant_name}
                </h1>
                <h2 className="">{restaurantInfo?.address.address_line1}</h2>
                <h2 className="">{restaurantInfo?.address.address_line2}</h2>
                <br />

                {/* Allow user to edit if the current rsetaurant is on their own profile page*/}
                {canEdit ? (
                    <>
                        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:min-w-[900px] max-w-[900px]">
                            {menu.map((item, i) => {
                                return (
                                    <EditFood
                                        key={item.name}
                                        image={item.image}
                                        name={item.name}
                                        description={item.description}
                                        price={item.price}
                                        addMenuItem={addMenuItem.bind(this)}
                                        id={i}
                                    />
                                );
                            })}
                        </div>
                        <button
                            className="bg-blue-300 m-auto px-6 py-1 rounded-3xl"
                            onClick={() => {
                                console.log('menu:', menu);
                                setMenu([...menu, {}]);
                            }}
                        >
                            + Add Item
                        </button>
                        <br />
                        <button
                            className="bg-green-300 m-auto px-6 py-1 rounded-3xl"
                            onClick={handleSubmit}
                        >
                            Submit New Menu
                        </button>
                    </>
                ) : menu.length > 0 ? (
                    <>
                        {restaurant_id === currentUserID && (
                            <button
                                className="bg-green-300 rounded py-2 px-4 m-auto"
                                onClick={() => {
                                    setCanEdit(true);
                                }}
                            >
                                Edit Menu
                            </button>
                        )}
                        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:min-w-[900px] max-w-[900px]">
                            {menu.map((item, i) => {
                                return (
                                    <Food
                                        key={item.name}
                                        image={item.image}
                                        name={item.name}
                                        description={item.description}
                                        price={item.price}
                                        addMenuItem={addMenuItem.bind(this)}
                                        id={i}
                                    />
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <>
                        <p>This Restaurant has no menu item added yet...</p>
                        {restaurant_id === currentUserID && (
                            <button
                                className="bg-green-300 rounded py-2 px-4 m-auto"
                                onClick={() => {
                                    setCanEdit(true);
                                }}
                            >
                                Edit Menu
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Restaurant_profile;
