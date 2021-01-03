import React, { useContext, useEffect, useState } from "react";
import { RouteContext } from "./RouteProvider";
import { ILink } from "./types";

/**
 * Link to a route.
 */
const Link = ({ to, children, className, activeClassName = "selected", isActive }: ILink) => {
    const { setPath, path } = useContext(RouteContext);
    const [active, setActive] = useState(false);

    const handleOnClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setPath(to);
    }

    useEffect(() => {
        if (isActive) {
            setActive(isActive(path));
        } else {
            setActive(path.indexOf(to) !== -1);
        }
    }, [path])

    const classname = `${className} ${active ? activeClassName : ""}`;

    return <a href={to} onClick={handleOnClick} className={classname} >
        {children}
    </a >
}

export default Link;