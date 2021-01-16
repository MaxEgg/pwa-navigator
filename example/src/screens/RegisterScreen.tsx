import React from "react";
import { Link } from "pwa-navigator"

const RegisterScreen = () => {
    return (<div className="screen">
        <div className="title">Sign up!</div>
        <div className="content">
            <input type="text" name="username" />
            <input type="password" name="password" />
            <button> Sign up </button>
            <Link to="/"> or Login</Link>
        </div>
    </div>);
}

export default RegisterScreen;