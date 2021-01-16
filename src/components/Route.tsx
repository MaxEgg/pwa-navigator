import React, { forwardRef, Fragment, useContext } from "react";
import Navigator from "./Navigator";
import { RouteContext } from "./RouteProvider";
import { IRoute } from "./types";
import styles from "./style.module.css";

const Route = forwardRef<HTMLDivElement, IRoute>(({ component: Component, children, url, params, childrenTransition, isActive }: IRoute, ref) => {
    const { toParent, setPath } = useContext(RouteContext);

    const classname = `${styles.route}  ${isActive ? styles.active : ''} pwa-navigator-route`;

    return (
        <Fragment>
            <div className={classname} ref={ref}>
                <Component params={params} toParent={toParent} setPath={setPath} />
            </div>
            {children && <Navigator parent={url} childrenTransition={childrenTransition}>{children}</Navigator>}
        </Fragment>
    );
});

export default Route;
