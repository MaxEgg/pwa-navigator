import React from "react";
import { IRouteComponent } from "pwa-navigator";

const MusicScreen = ({ params, toParent }: IRouteComponent) => {
    return <div>music, {params?.musicUuid}<button onClick={toParent}>back</button></div>
}

export default MusicScreen;