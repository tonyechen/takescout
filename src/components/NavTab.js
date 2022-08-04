import React from "react";
import { Link } from "react-router-dom";

const NavTab = (props) => {
    return (
        <Link
            to={props.to}
            className="flex items-center px-[1rem] h-auto hover:bg-yellow-200"
        >
            <p className="h-min">{props.name}</p>
        </Link>
    );
};

export default NavTab;
