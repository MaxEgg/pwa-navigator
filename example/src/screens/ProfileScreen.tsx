import React, { useCallback, useContext } from "react";
import { IRouteComponent } from "../../../dist";
import { LoginContext } from "../providers/LoginProvider";

const ProfileScreen = ({ setPath }: IRouteComponent) => {
    const { setLoggedIn } = useContext(LoginContext);

    const handleLogout = useCallback(() => {
        setPath("/");
        setLoggedIn(false)
    }, [setLoggedIn, setPath]);


    return <div>Profile<button onClick={handleLogout}>LOGOUT</button></div>
}

export default ProfileScreen;