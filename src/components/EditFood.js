import React, { useEffect, useState } from 'react';
import Food from './Food';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRecoilValue } from 'recoil';
import { userUID } from '../atom/userInfo';

const EditFood = (props) => {
    const uid = useRecoilValue(userUID);
    const [state, setState] = useState(props);
    const [canEdit, setCanEdit] = useState(false);
    let { id, image, name, description, price, addMenuItem } = state;

    console.log(state);

    const handleSubmit = (e) => {
        e.preventDefault();

        let newImage = e.target[0].files[0];
        const newName = e.target[1].value;
        const newPrice = e.target[2].value;
        const newDescription = e.target[3].value;

        // upload image
        if (newImage != null) {
            const imageRef = ref(storage, `images/${uid}/${newImage.name}`);
            uploadBytes(imageRef, newImage).then((res) => {
                console.log(res);
                getDownloadURL(res.ref).then((url) => {
                    setState({
                        id: id,
                        image: url,
                        name: newName,
                        price: newPrice,
                        description: newDescription,
                        addMenuItem: addMenuItem,
                    });
                    props.addMenuItem(
                        id,
                        url,
                        newName,
                        newPrice,
                        newDescription
                    );
                });
            });
        } else {
            // the parent component doesn't trigger rerender after updating
            image = newImage;
            name = newName;
            description = newDescription;
            price = newPrice;

            props.addMenuItem(id, newImage, newName, newPrice, newDescription);

            setState({
                id: id,
                image: newImage,
                name: newName,
                price: newPrice,
                description: newDescription,
                addMenuItem: addMenuItem,
            });
        }
    };

    return (
        <>
            {state.name && !canEdit ? (
                <div>
                    <Food
                        image={image}
                        name={name}
                        description={description}
                        price={price}
                    />
                    <button
                        className="rounded bg-slate-300 px-6 py-1 mt-5"
                        onClick={() => {
                            setCanEdit(true);
                        }}
                    >
                        Edit
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="text-start">
                        <div className="w-[100%] h-[12rem] overflow-hidden">
                            <img
                                src={
                                    image
                                        ? image
                                        : 'https://weu-az-mfv-live-cdnep.azureedge.net/mediacontainer/medialibraries/myfamilyvets/my-family-vets/articles-2020/corgi-body-1.jpg'
                                }
                                alt="food"
                            />
                        </div>

                        <input
                            type="file"
                            accept="image/png, image/jpg, image/jpeg"
                            id="image"
                        />

                        <div className="w-[100%] flex justify-between">
                            <label htmlFor="name" className="w-[30%]">
                                Food Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                required
                                className="w-[70%] border"
                            />
                        </div>

                        <div className="w-[100%] flex justify-between">
                            <label htmlFor="price">Price</label>
                            <input
                                type="text"
                                id="price"
                                value={price}
                                required
                                className="w-[70%] border"
                            />
                        </div>

                        <div className="w-[100%] flex justify-between">
                            <label htmlFor="description" className="w-[30%]">
                                Description
                            </label>
                            <textarea
                                type="paragraph"
                                id="description"
                                value={description}
                                className="w-[70%] min-h-min border"
                            />
                        </div>
                    </div>
                    <br />
                    <input
                        type="submit"
                        className="bg-green-300 rounded-2xl px-5 py-1"
                        value="Confirm"
                    />
                </form>
            )}
        </>
    );
};

export default EditFood;
