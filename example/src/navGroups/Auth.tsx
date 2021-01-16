import { Navigator, Route } from "pwa-navigator";
import React from "react";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

export default () => {
    return (
        <Navigator>
            <Route
                url=""
                component={LoginScreen}
                childrenTransition="stack"
            >
                <Route
                    url="forgot-password"
                    component={ForgotPasswordScreen}
                />
            </Route>
            <Route
                url="register"
                component={RegisterScreen}
            />
        </Navigator >)
}