import React, { useState } from "react";
import Register from "./Register";
import SignUp from "./SignUp";
import './style.scss';

const Login = () => {
    const [change, setChange] = useState(false)

    return (
        <div className="login">
            {
                change ? <Register setChange={setChange} /> : <SignUp setChange={setChange} />
            }
        </div>
    )
}
export default Login