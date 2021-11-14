import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";

const RegisterPage = () => {
    let {userRegister} = useContext(AuthContext)

    return (
        <div>
            <form onSubmit={userRegister}>
                <input type="email" name="email" placeholder="Enter Email" />
                <input type="password" name="password" placeholder="Enter Password" />
                <select name="metric">
                    <option value="imperial">Farenheit</option>
                    <option value="metric">Celsious</option>
                </select>
                <input type="submit" value="Submit"/>

            </form>
        </div>
    )
}

export default RegisterPage;