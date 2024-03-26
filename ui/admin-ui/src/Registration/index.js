import React, { useState } from "react";
import "./registration.css";

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    function sendLoginRequest() {
        const reqBody = {
            name: username,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName
        };

        fetch("api/auth/register", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                if (response.status === 200)
                    return Promise.all();
                else return Promise.reject("Invalid registration attempt");
            })
            .then(() => {
                window.location.href = "titles/released";
            })
            .catch((message) => {
                alert(message);
            });
        window.location.href = "/login";
    }

    return (
        <div className="main">
            <div className="register-form">
                <div>
                    <div className="reg-form-group">
                        <label>Створіть нікнейм</label>
                        <input
                            type="text"
                            name="name"
                            className="reg-form-control"
                            placeholder="Нікнейм"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="reg-form-group">
                        <label>Прізвище</label>
                        <input
                            type="text"
                            name="lastName"
                            className="reg-form-control"
                            placeholder="Прізвище"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </div>
                    <div className="reg-form-group">
                        <label>Ім'я</label>
                        <input
                            type="text"
                            name="firstName"
                            className="reg-form-control"
                            placeholder="Ім'я"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </div>
                    <div className="reg-form-group">
                        <label>Електронна пошта</label>
                        <input
                            type="text"
                            name="email"
                            className="reg-form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="reg-form-group">
                        <label>Створіть пароль</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="reg-form-control"
                            placeholder="Пароль"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="reg-form-group reg-form-check">
                        <input type="checkbox" className="check-input" onClick={() => togglePasswordVisibility()} />
                        <label className="form-check-label">Показати/сховати пароль</label>
                    </div>
                    <div className="reg-actions">
                        <button type="submit" className="reg-submit" onClick={() => sendLoginRequest()}>
                            Створити
                        </button>
                        <a href="/login" className="href-auth">
                            Авторизація
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
