import React, { Children, cloneElement, ReactElement, useContext, useEffect, useRef, useState } from "react";
import { INavigator, IRoute, RouteChild } from "./types";
import { RouteContext } from "./RouteProvider";
import * as transitions from "./transitions";
import styles from "./style.module.css";

const Navigator = ({ children, childrenTransition = "slide", parent = "" }: INavigator) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const localPaths = useRef<{ [key: string]: any }>({});
    const { path, setPath, setPaths, params } = useContext(RouteContext);
    const transition = useRef<any>();
    const [navigatorActive, setNavigatorActive] = useState<boolean>(false);

    const handleTransitionEnd = (newPath: string) => {
        setPath(newPath);
    };

    useEffect(() => {
        if (!transition.current) {
            transition.current = new transitions[childrenTransition](rootRef.current, localPaths.current, handleTransitionEnd);
        }
        return () => { transition.current = null };
    }, [navigatorActive, childrenTransition, handleTransitionEnd]);

    useEffect(() => {
        setPaths(localPaths.current);
    }, [setPaths]);

    useEffect(() => {
        if (localPaths.current[path]) {
            transition.current?.to(path, true);
        }

        let isNavigatorActive = false;

        for (const navigatorPath in localPaths.current) {
            if (path.indexOf(navigatorPath) === 0) {
                isNavigatorActive = true;
                break;
            }
        }

        if (isNavigatorActive !== navigatorActive) {
            setNavigatorActive(isNavigatorActive);
        }

    }, [path]);

    const classname = `${styles.navigationRoot} ${navigatorActive ? "" : styles.invisible}`;

    return <div className={classname} ref={rootRef}>{
        Children.map(children, (child: ReactElement<IRoute>) => {
            const url = parent + "/" + child.props.url;
            const isActive = url === path;

            return cloneElement(child as ReactElement<RouteChild>, {
                url,
                isActive,
                ref: (node: any) => {
                    localPaths.current[url] = node;
                },
                params,
            });
        })}</div>
}


export default Navigator;