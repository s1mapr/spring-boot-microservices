import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import Header from "../Header";
import "./comments.css";


const Comments = () => {
    const [comments, setComments] = useState(null);
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [filter, setFilter] = useState("");
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const params = new URLSearchParams(window.location.search);

    const handleSearch = () => {
        const url = `/comments?filter=${encodeURIComponent(filter)}`;
        window.location.href = url;
    }


    const handleSort = (sortValue) => {
        window.location.href = `/comments?sort=${sortValue}`;
    };

    function deleteComment(id) {
        fetch(`/api/comments/${id}/del`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "DELETE",
        })
        window.location.reload();
    }

    const toggleSortDropdown = () => {
        setSortDropdownOpen(!sortDropdownOpen);
    }
    useEffect(() => {

        let url = `/api/comments`;

        if (params.has("filter")) {
            const filterValue = params.get('filter');
            url = `/api/comments/f?filter=${filterValue}`;
        } else if (params.has('sort')) {
            const sortValue = params.get('sort');
            if (sortValue === 'id') {
                url = `/api/comments/sort/id`;
            } else if (sortValue === 'date') {
                url = `/api/comments/sort/date`;
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
            .then((commentsData) => {
                setComments(commentsData);
            });
    }, []);

    return (
        <body className="d-flex flex-column h-100">
            <Header />
            <main className="comments-main">
                <div className="comments-container">
                    <div className="comments-search">
                        <div className="comments-input-group">
                            <input
                                className="comments-form-control"
                                type="search"
                                placeholder="Пошук по за текстом"
                                aria-label="Search"
                                id="filter"
                                value={filter}
                                onChange={(event) => setFilter(event.target.value)}
                            />
                            <button
                                className="comments-btn"
                                type="button"
                                onClick={handleSearch}
                            >
                                Пошук
                            </button>
                        </div>
                    </div>
                    <div className="comments-sort">
                        <div className="comments-dropdown">
                            <button
                                className="comments-btn"
                                type="button"
                                onClick={toggleSortDropdown}
                            >
                                Сортувати за
                            </button>
                            {sortDropdownOpen && (
                                <ul className="comments-dropdown-menu">
                                    <li>
                                        <button
                                            className="comments-dropdown-item"
                                            type="button"
                                            onClick={() => handleSort('id')}
                                        >
                                            Ідентифікатором
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="comments-dropdown-item"
                                            type="button"
                                            onClick={() => handleSort('date')}
                                        >
                                            Датою створення
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <a className="comments-reset-btn" href="/comments/">Скинути</a>
                    </div>

                    <div className="comments-table">
                        <div className="comments-table-responsive">
                            <table className="comments-table-custom">
                                <thead>
                                    <tr>
                                        <th scope="col">Текст</th>
                                        <th scope="col">Дата створення</th>
                                        <th scope="col">Нік користувача</th>
                                        <th width="150" className="text-center" scope="col">
                                            Видалити коментар
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comments && comments.map((comment) => (
                                        <tr key={comment.id}>
                                            <td>{comment.commentVal}</td>
                                            <td>{new Date(comment.creationDate).toLocaleString()}</td>
                                            <td><a  className="comments-href-id" href={`/users/${comment.user.id}`}>{comment.user.name}</a></td>
                                            <td width="150" className="text-center">
                                                <div>
                                                    <button className="btn btn-danger btn-xs form-control" type="submit" onClick={() => deleteComment(comment.id)}>
                                                        Видалити
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    );
};

export default Comments;