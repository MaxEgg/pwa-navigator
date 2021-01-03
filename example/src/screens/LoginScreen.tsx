import React from "react";
import { Link } from "pwa-navigator"

const LoginScreen = () => {
    return <div>Login
         <Link to="/matches">Login</Link>
        <Link to="/forgot">Forgot your passport?</Link>
    </div>
}

export default LoginScreen;