import React, { useCallback, useContext } from "react";
import { Link } from "pwa-navigator"
import { LoginContext } from "../providers/LoginProvider";

const LoginScreen = () => {
    const { setLoggedIn } = useContext(LoginContext);

    const handleLogin = useCallback(() => {
        setLoggedIn(true)
    }, [setLoggedIn]);

    return <div className="screen">
        <div className="title">Login</div>
        <div className="content">


            <input type="text" name="username" />
            <input type="password" name="password" />
            <button onClick={handleLogin}>LOGIN</button>

            <Link to="/register">No account yet?</Link>
            <Link to="/forgot-password">Forgot your passport?</Link>
        </div>
    </div>
}

export default LoginScreen;