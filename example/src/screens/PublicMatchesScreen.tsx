import React from "react";
import { IRouteComponent, Link } from "pwa-navigator";

const PublicMatchesScreen = ({ toParent }: IRouteComponent) => {
    return <div>Public <Link to="/matches/public/10">match 10</Link>
        <button onClick={toParent}>Back</button>
    </div>
}

export default PublicMatchesScreen;