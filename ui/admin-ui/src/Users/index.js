import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import Header from "../Header";
import "./users.css"


const Users = () => {

    const [users, setUsers] = useState(null);
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [filter, setFilter] = useState("");
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const params = new URLSearchParams(window.location.search);


    const handleSearch = () => {
        const url = `/users?filter=${encodeURIComponent(filter)}`;
        window.location.href = url;
    }


    const handleSort = (sortValue) => {
        window.location.href = `/users?sort=${sortValue}`;
    };

    const toggleSortDropdown = () => {
        setSortDropdownOpen(!sortDropdownOpen);
    }

    useEffect(() => {

        let url = `/api/users`;

        if (params.has("filter")) {
            const filterValue = params.get('filter');
            url = `/api/users/f?filter=${filterValue}`;
        } else if (params.has('sort')) {
            const sortValue = params.get('sort');
            if (sortValue === 'id') {
                url = `/api/users/sort/id`;
            } else if (sortValue === 'date') {
                url = `/api/users/sort/date`;
            }
        }

        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
            .then((response) => {
                if (response.status === 200) return response.json();
            })
            .then((usersData) => {
                setUsers(usersData);
            });
    }, []);



    return (
        <body className="d-flex flex-column h-100">
            <Header />
            <main className="users-main">
                <div className="users-container">
                    <div className="users-search">
                        <div className="users-input-group">
                            <input
                                className="users-form-control"
                                type="search"
                                placeholder="Пошук по нікнейму"
                                aria-label="Search"
                                id="filter"
                                value={filter}
                                onChange={(event) => setFilter(event.target.value)}
                            />
                            <button
                                className="users-btn"
                                type="button"
                                onClick={handleSearch}
                            >
                                Пошук
                            </button>
                        </div>
                    </div>
                    <div className="users-sort">
                        <div className="users-dropdown">
                            <button
                                className="users-btn"
                                type="button"
                                onClick={toggleSortDropdown}
                            >
                                Сортувати за
                            </button>
                            {sortDropdownOpen && (
                                <ul className="users-dropdown-menu">
                                    <li>
                                        <button
                                            className="users-dropdown-item"
                                            type="button"
                                            onClick={() => handleSort('id')}
                                        >
                                            Ідентифікатором
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="users-dropdown-item"
                                            type="button"
                                            onClick={() => handleSort('date')}
                                        >
                                            Датою створення
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <a className="users-reset-btn" href="/users/">Скинути</a>
                    </div>
                    <div className="users-table">
                        <div className="users-table-responsive">
                            <table className="users-table-custom">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">@Нікнейм</th>
                                        <th scope="col">Статус</th>
                                        <th scope="col">Роль</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Прізвище</th>
                                        <th scope="col">Ім'я</th>
                                        <th scope="col">Дата реєстрації</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users && users.length > 0 ? (

                                        users.map((user) => (
                                            <tr key={user.id}>
                                                <td>
                                                    <a className="users-href-id" href={'/users/' + user.id}>{user.id}</a>
                                                </td>
                                                <td>
                                                    <span>{user.name}</span>
                                                </td>
                                                <td>
                                                    {user.banned ? 'Заблокований' : 'Вільне користування'}
                                                </td>
                                                <td                                                >
                                                    {user.role === "AUTHOR" ? "Автор" :
                                                        user.role === "PRE_AUTHOR" ? "Запит на авторство" :
                                                            user.role === "USER" ? "Користувач" : ""}                                                </td>
                                                <td>
                                                    <span>{user.email}</span>
                                                </td>
                                                <td>
                                                    <span>{user.lastName}</span>
                                                </td>
                                                <td>
                                                    <span>{user.firstName}</span>
                                                </td>
                                                <td>
                                                    <span>{user.creationDate}</span>
                                                </td>
                                            </tr>
                                        ))) : <>
                                        Немає користувачів
                                    </>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    )
}

export default Users;