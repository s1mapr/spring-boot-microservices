import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import Header from "../Header";
import { useParams } from 'react-router-dom';

import "./user.css";

const User = () => {

    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useLocalState("", "jwt");
    const { id } = useParams();


    function deleteComment(userId, commentId) {
        fetch(`/api/users/${userId}/comment/${commentId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "DELETE",
        });
        window.location.reload();
    }

    function changeUserRoleToAuthor(id) {
        fetch(`/api/users/${id}/make-author`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "PATCH",
        });
        window.location.reload();
    }

    function changeUserRoleToUser(id) {
        fetch(`/api/users/${id}/cancel-author`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "PATCH",
        });
        window.location.reload();
    }

    function blockOrUnblockUser(id) {
        fetch(`/api/users/${id}/ban`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "PATCH",
        });
        window.location.reload();
    }

    useEffect(() => {

        fetch("/api/users/" + { id }.id, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
            .then((response) => {
                if (response.status === 200) return response.json();
            })
            .then((userData) => {
                setUser(userData);
            });
    }, []);


    return (
        <body>
            <Header />
            <main className="user-main">
                <div className="user-container">
                    <div className="user-info-container">
                        <div className="user-info">
                            <h4>Інформація про користувача:</h4>
                            <div className="user-form-group">
                                {user && (
                                    <>
                                        <div className="user-form-control">
                                            <label htmlFor="firstName">Ім'я</label>
                                            <input type="text" id="firstName" placeholder={user.user.firstName} disabled value="" required="" />
                                        </div>
                                        <div className="user-form-control">
                                            <label htmlFor="lastName">Прізвище</label>
                                            <input type="text" id="lastName" placeholder={user.user.lastName} disabled value="" required="" />
                                        </div>
                                        <div className="user-form-control">
                                            <label htmlFor="username">@нікнейм</label>
                                            <input type="text" id="username" placeholder={user.user.name} disabled required="" />
                                        </div>
                                        <div className="user-form-control">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" id="email" placeholder={user.user.email} disabled />
                                        </div>
                                        {(user.user.role === 'PRE_AUTHOR' || user.user.role === 'AUTHOR') && (
                                            <div className="user-role-control">
                                                <div className="user-rile-control-div">
                                                    <label>{`Користувач ${user.user.role === 'AUTHOR' ? 'має роль автора' : 'хоче стати автором'}. Натисність, щоб`}</label>
                                                    <button type="submit" className="btn-change-role"
                                                        onClick={() => user.user.role === 'AUTHOR' ? changeUserRoleToUser(user.user.id) : changeUserRoleToAuthor(user.user.id)}
                                                    >
                                                        {`${user.user.role === 'AUTHOR' ? 'Прибрати роль автора' : 'Дозволити роль автора'
                                                            }`}</button>
                                                </div>
                                            </div>
                                        )}
                                        <div className="user-role-control">
                                            <div className="user-role-control-div">
                                                <button type="submit" className={user.user.banned ? 'btn-unban-user' : 'btn-ban-user'}
                                                    onClick={() => (blockOrUnblockUser(user.user.id))}>
                                                    {user.user.banned ? 'Розбанити користувача' : 'Забанити користувача'}
                                                </button>
                                            </div>
                                        </div>

                                        <h3>Публікації, створенні користувачем:</h3>
                                        {user.titles.map(title => (
                                            <div key={title.id} className="user-title-info">
                                                <div className="user-title-content">
                                                    <div>
                                                        <strong>{title.originalAuthor}</strong>
                                                        <h3>{title.titleName}</h3>
                                                        <div>{title.creationDate ? new Date(title.creationDate).toLocaleString() : '[date parse error]'}</div>
                                                        <p>{title.description}</p>
                                                    </div>
                                                    <a href={`/titles/${title.id}`}>Відкрити інформацію про публікацію</a>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="user-comments-container">
                        {user && (
                            <>
                                <h4 className="user-comments-heading">
                                    <span>Коментарі користувача:</span>
                                </h4>
                                <ul className="user-comments-list">
                                    {user.user.comments.length > 0 ? (
                                        user.user.comments.map(comm => (
                                            <li key={comm.id} className="user-comment-item">
                                                <a href={`/titles/${comm.titleContent.title.id}`} className="user-comment-link">
                                                    <div className="user-comment-content">
                                                        <h6 style={{ color: "black" }}>{comm.creationDate ? new Date(comm.creationDate).toLocaleString() : '[date parse error]'}</h6>
                                                        <small>{comm.commentVal}</small>
                                                    </div>
                                                </a>
                                                <i className="user-comment-action">
                                                    <div className="user-comment-delete">
                                                        <button type="submit"
                                                            onClick={() => deleteComment(user.user.id, comm.id)}
                                                        >видалити</button>
                                                    </div>
                                                </i>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="user-comment-item">
                                            <div className="user-comment-content">
                                                <h6>Користувач нічого</h6>
                                                <small>не прокоментував</small>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </body>
    );
}

export default User;
