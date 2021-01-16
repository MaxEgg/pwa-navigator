import React from "react";
import { Link, IRouteComponent } from "pwa-navigator";

const MatchScreen = ({ params, toParent }: IRouteComponent) => {
    return (<div>Match, {params?.uuid} <button onClick={toParent}>Back</button>
        <Link to={`/public/${params?.uuid}/video/5`}>video</Link>
        <Link to={`/public/${params?.uuid}/music/6`}>audio</Link>
    </div>)
}

export default MatchScreen;