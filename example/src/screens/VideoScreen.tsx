import React from "react";
import { IRouteComponent } from "pwa-navigator";

const VideoScreen = ({ params, toParent }: IRouteComponent) => {
    return <div>Video, {params?.videoUuid} <button onClick={toParent}>back</button></div>
}

export default VideoScreen;