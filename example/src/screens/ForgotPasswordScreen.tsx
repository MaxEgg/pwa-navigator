import React from "react";
import { IRouteComponent } from "../../../dist";

const ForgotPasswordScreen = ({ toParent }: IRouteComponent) => {
    return <div className="screen">
        <div className="title">Forgot password</div>
        <div className="content">
            <input type="email" name="email" />
            <button >Reset password</button>
            <button onClick={toParent}>Back</button>
        </div>
    </div>
}

export default ForgotPasswordScreen;