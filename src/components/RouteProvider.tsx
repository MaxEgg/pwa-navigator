
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IRouteProvider } from "./types";

export const RouteContext = React.createContext({
    path: "",
    paths: {},
    params: {},
    setPath: (path: string) => { path; },
    pushState: (path: string) => { path; },
    setPaths: (paths: { [key: string]: any }) => { paths },
    unSetPaths: (paths: { [key: string]: any }) => { paths },
    toParent: () => { }
});

/**
 * Route provider. 
 * 
 * The route provider keeps track of all the navigators. 
 * When the current path is set in the state. It signals the navigator to check what to display. 
 */
const RouteProvider = (({ children }: IRouteProvider) => {
    const [pathState, setPathState] = useState<string>(window.location.pathname);
    const params = useRef<{ [key: string]: any }>({});
    const [paths, setAllPaths] = useState<{ [key: string]: any }>({});
    const localPaths = useRef<{ [key: string]: any }>({});

    /**
     * Collect the paths from every navigator. At the moment a navigator is initiate it collects the paths inside the navigator and adds them to the main collection in this provider.
     * @param newPaths 
     */
    const setPaths = useCallback((newPaths: { [key: string]: any }): void => {
        localPaths.current = {
            ...localPaths.current,
            ...newPaths
        }
    }, [setAllPaths]);

    /**
     * Unset paths when navigator is unmounted
     */
    const unSetPaths = useCallback((oldPaths: { [key: string]: any }): void => {
        const keys = Object.keys(oldPaths);
        for (const key of keys) {
            delete localPaths.current[key];
        }
    }, [setAllPaths]);

    /**
     * Match parameters to a the given path. And set the parameters in the params. 
     * @return Path without parameters;
     */
    const matchParams = useCallback((newPath: string): string | null => {
        const newPathRoutes = newPath.split("/");

        next_path: for (const path in localPaths.current) {
            const routes = path.split("/");
            if (routes.length !== newPathRoutes.length) {
                continue;
            }

            params.current = {};

            for (const index in routes) {
                if (routes[index] !== newPathRoutes[index] && routes[index].indexOf(":") !== 0) {
                    continue next_path;
                } else if (routes[index].indexOf(":") === 0) {
                    params.current = {
                        ...params.current,
                        [routes[index].substring(1)]: newPathRoutes[index]
                    }
                }
            }

            return path;
        }
        return null;
    }, []);

    /**
     * Set path.
     * 
     * Set a new path to the history api and set the state to trigger a rerender of navigators.
     * @param path The new path. 
     */
    const setPath = useCallback((path: string): void => {
        if (Object.keys(localPaths.current).length !== 0) {
            const pathWithoutParams = matchParams(path);
            window.history.pushState("", "", path);
            setPathState(pathWithoutParams || "404");
        }
    }, [paths, matchParams, setPathState]);

    /** 
     * Push state to history.
     * 
     * This function pushes the path to the history state and
     * doesn't call a useState function to prevent the navigators from rerendering
     * and destroying the transition.
     * 
     * @param path The new path. 
     */
    const pushState = useCallback((path: string): void => {
        window.history.pushState("", "", path);
    }, []);

    /**
     * To parent.
     * 
     * Redirect from the current path back to the path of the parrent. 
     * Instead of using the browser "go back" function this function keeps the user in the application when arriving from another website. 
     */
    const toParent = useCallback((): void => {
        const currentPath = window.location.pathname;
        const pathChunks = currentPath.split("/");

        for (let x = 0; x < Object.keys(localPaths.current).length; x++) {
            pathChunks.pop();
            const newPath = pathChunks.join("/") || "/";
            const pathWithoutParams = matchParams(newPath);

            if (pathWithoutParams && pathWithoutParams in localPaths.current) {
                setPath(newPath);
                break;
            }
        }
    }, [matchParams, setPath, paths]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Object.keys(localPaths.current).length !== 0) {
                clearInterval(interval);
                const pathWithoutParams = matchParams(window.location.pathname);
                setPathState(pathWithoutParams || "404");
            }
        }, 50)
    }, [setPathState, matchParams, paths]);

    return <RouteContext.Provider value={{ path: pathState, paths, pushState, setPath, setPaths, unSetPaths, params: params.current, toParent }}>
        {children}
    </RouteContext.Provider>
});

export default RouteProvider;