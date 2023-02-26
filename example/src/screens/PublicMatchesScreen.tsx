import React from "react";
import { IRouteComponent, Link } from "pwa-navigator";

const PublicMatchesScreen = ({ toParent }: IRouteComponent) => {
    return <div className="public-matches-screen">Public <Link to="/public/10">match 10</Link>
        <button onClick={toParent}>Back</button>
    </div>
}

export default PublicMatchesScreen;