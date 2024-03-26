import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [user, setUser] = useLocalState(null, "user");

    function sendLoginRequest() {
        const reqBody = {
            name: username,
            password: password,
        };
        fetch("api/auth/token", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                if (response.status === 200)
                    return Promise.all([response.json(), response.headers]);
                else return Promise.reject("Invalind login attempt");
            })
            .then(([body, headers]) => {
                setJwt(headers.get("authorization"));
                setUser(body);
                window.location.href = "titles/released";
            })
            .catch((message) => {
                alert(message);
            });

    }

    return (
        <>
            <main className="login-main">
                <div className="reg-form">
                    <div className="reg-form-div">
                        <label>Логін адміністратора</label>
                        <input
                            className="form-control"
                            placeholder="Логін"
                            id="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <label>Введіть пароль</label>
                        <input
                            className="form-control"
                            placeholder="Пароль"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <div className="login-actions">
                            <input
                                className="login-submit"
                                id="submit"
                                value={"Увійти"}
                                type="button"
                                onClick={() => sendLoginRequest()}
                            />
                            <a type="submit" className="href-register" href="/register">Зареєструватися</a>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Login;