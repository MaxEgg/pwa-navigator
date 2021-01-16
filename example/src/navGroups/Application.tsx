import React from "react";
import { Navigator, Route } from "pwa-navigator";
import MatchesScreen from "../screens/MatchesScreen";
import PublicMatchesScreen from "../screens/PublicMatchesScreen";
import MatchScreen from "../screens/MatchScreen";
import VideoScreen from "../screens/VideoScreen";
import MusicScreen from "../screens/MusicScreen";
import TournamentsScreen from "../screens/TournamentsScreen";
import FeedScreen from "../screens/FeedScreen";
import ProfileScreen from "../screens/ProfileScreen";

export default () => {
    return (
        <Navigator>
            <Route
                url=""
                component={MatchesScreen}
            >
                <Route
                    url="public"
                    component={PublicMatchesScreen}
                    childrenTransition="stack"
                >
                    <Route
                        url=":uuid"
                        component={MatchScreen}
                        childrenTransition="stack"
                    >
                        <Route
                            url="video/:videoUuid"
                            component={VideoScreen}
                        />
                        <Route
                            url="music/:musicUuid"
                            component={MusicScreen}
                        />
                    </Route>
                </Route>
                <Route
                    url="tournaments"
                    component={TournamentsScreen}
                />
            </Route>
            <Route
                url="feed"
                component={FeedScreen}
            />
            <Route
                url="profile"
                component={ProfileScreen}
            />
        </Navigator >)
}