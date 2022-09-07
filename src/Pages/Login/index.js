import React, { useState } from "react";
import Register from "./Register";
import SignUp from "./SignUp";
import './style.scss';

const Login = (props) => {
    const { authen, setAuthen, user, setUser } = props
    const [change, setChange] = useState(false)

    return (
        <div className="login">
            {
                change ? <Register setChange={setChange} /> : <SignUp setChange={setChange} setAuthen={setAuthen} setUser={setUser} />
            }
        </div>
    )
}
export default Login