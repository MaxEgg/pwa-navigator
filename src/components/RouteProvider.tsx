
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IRouteProvider } from "./types";

export const RouteContext = React.createContext({
    path: "",
    paths: {},
    params: {},
    setPath: (path: string) => { path; },
    setPaths: (paths: { [key: string]: any }) => { paths },
    toParent: () => { }
});

const RouteProvider = (({ children }: IRouteProvider) => {
    const [path, setPathState] = useState<string>(window.location.pathname);
    const params = useRef<{ [key: string]: any }>({});
    const [paths, setAllPaths] = useState<{ [key: string]: any }>({});
    const localPaths = useRef<{ [key: string]: any }>({});

    /**
     * Collect all the paths from every navigator.
     * @param newPaths 
     */
    const setPaths = useCallback((newPaths: { [key: string]: any }) => {
        localPaths.current = {
            ...localPaths.current,
            ...newPaths
        }
    }, [setAllPaths]);

    /**
     * Match parameters to a the given path. And set the parameters in the params. 
     * @return Path without parameters;
     */
    const matchParams = useCallback((newPath: string) => {
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
     * Set a new path
     * @param path 
     */
    const setPath = useCallback((path: string) => {
        if (Object.keys(localPaths.current).length !== 0) {
            const pathWithoutParams = matchParams(path);
            window.history.pushState("", "", path);
            setPathState(pathWithoutParams || "404");
        }
    }, [paths, matchParams, setPathState]);

    /**
     * Redirect from the current path back to the path of the parrent. 
     * Instead of using the browser "go back" function this function keeps the user in the application when coming in over a link. 
     */
    const toParent = useCallback(() => {
        const currentPath = window.location.pathname;
        const pathChunks = currentPath.split("/");

        for (let x = 0; x < Object.keys(localPaths.current).length; x++) {
            pathChunks.pop();
            const newPath = pathChunks.join("/");
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

    return <RouteContext.Provider value={{ path, paths, setPath, setPaths, params: params.current, toParent }}>
        {children}
    </RouteContext.Provider>
});

export default RouteProvider;