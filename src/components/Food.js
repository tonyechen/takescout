import React from 'react';

const Food = ({ image, name, description, price }) => {
    return (
        <div className="text-start">
            <div className="w-[100%] overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="object-cover w-[100%] h-[12rem]"
                />
            </div>
            <div className="flex text-lg justify-between">
                <p>{name}</p>
                <p>{price}</p>
            </div>
            <p className="">{description}</p>
        </div>
    );
};

export default Food;
