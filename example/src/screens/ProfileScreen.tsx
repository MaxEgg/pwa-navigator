import { Link } from "pwa-navigator";
import React, { useCallback, useContext } from "react";
import { IRouteComponent } from "../../../dist";
import { LoginContext } from "../providers/LoginProvider";

const ProfileScreen = ({ setPath }: IRouteComponent) => {
    const { setLoggedIn } = useContext(LoginContext);

    const handleLogout = useCallback(() => {
        setPath("/");
        setLoggedIn(false)
    }, [setLoggedIn, setPath]);

    return (
      <div className='screen'>
        <div className='title'>Profile</div>
        <div className='content'>
          <Link to='/public'>Public</Link>
          <Link to='/tournaments'>Tournaments</Link>
          <div>Profile</div>
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
      </div>
    )
}

export default ProfileScreen;