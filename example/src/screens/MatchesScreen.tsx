import React from "react";
import { Link } from "pwa-navigator";

const MatchesScreen = () => {

    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return <div className="screen">
        <div className="title">Matches</div>
        <div className="content">
            <Link to="/public">Public</Link>
            <Link to="/tournaments">Tournaments</Link>
            <ul>
                {
                    array.map((number) => {
                        return (
                            <li key={number}>
                                <div className="list-item">{number}
                                    <img src="https://images.unsplash.com/photo-1609748153351-bf2abe6b3569?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2126&q=80" />
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    </div>
}

export default MatchesScreen;