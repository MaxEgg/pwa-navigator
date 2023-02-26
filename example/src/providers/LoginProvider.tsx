import React, { ReactNode, useState } from "react";
export const LoginContext = React.createContext({
    //@ts-ignore
    setLoggedIn: (loggedIn: boolean) => { },
    loggedIn: false
});

interface IProps {
    children: ReactNode;
}
const LoginProvider = ({ children }: IProps) => {
    const [loggedIn, setLocalLoggedIn] = useState<boolean>(localStorage.getItem("loggedIn") === "true" ? true : false);
    
    const setLoggedIn = (value: boolean) => {
        localStorage.setItem("loggedIn", value.toString());
        setLocalLoggedIn(value);
    }

    return (
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginProvider;