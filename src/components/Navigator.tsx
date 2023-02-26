import React, { Children, cloneElement, ReactElement, useCallback, useContext, useEffect, useRef, useState } from "react";
import { INavigator, IRoute, RouteChild } from "./types";
import { RouteContext } from "./RouteProvider";
import * as transitions from "./transitions";
import styles from "./style.module.css";

/**
 * Navigator.
 * 
 * Keep track of it children routes. 
 * 
 * @param param0 
 */
const Navigator = ({ children, childrenTransition = "slide", parent = "", accesable }: INavigator) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const localPaths = useRef<{ [key: string]: any }>({});
    const { path, pushState, setPaths, unSetPaths, params } = useContext(RouteContext);
    const transition = useRef<any>();
    const [navigatorActive, setNavigatorActive] = useState<boolean>(false);

    const initiateTransition = useCallback(() => {
        transition.current = new transitions[childrenTransition](rootRef.current, localPaths.current, handleTransitionEnd);
    }, [childrenTransition])

    const handleTransitionEnd = useCallback((newPath: string) => {
        pushState(newPath);
    }, [pushState]);

    useEffect(() => {
        setPaths(localPaths.current);

        return () => {
            unSetPaths(localPaths.current);
        }
    }, [setPaths]);

    useEffect(() => {
        if (localPaths.current[path]) {
            if (!transition.current) {
                initiateTransition()
            }
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

    if (accesable === false) {
        return null;
    }

    const classname = `${styles.navigationRoot} ${navigatorActive ? "" : styles.invisible} pwa-navigator-root`;

    return <div className={classname} ref={rootRef}>{
        Children.map(children, (child: ReactElement<IRoute>) => {
            let url = `${parent !== "/" ? parent : ""}/${child.props.url}`;

            if (parent !== "/") {
                url = parent + "/" + child.props.url;
            }

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