import React from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
    return (
        <div className="header">
            <Link to="/" className="logo">
                <img src={logo} alt="logo" />
            </Link>
        </div>
    );
};

export default Header;
