import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import Header from "../Header";
import "./contents.css";

const Contents = () => {
    const [contents, setContents] = useState(null);
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [tagName, setTagName] = useState("");
    const [serialName, setSerialName] = useState("");
    const [categoryName, setCategoryName] = useState("");

    function deleteTag(id) {
        fetch(`/api/contents/t/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "DELETE",
        })
            .then(() => window.location.reload());
    }

    function deleteSerial(id) {
        fetch(`/api/contents/s/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "DELETE",
        })
            .then(() => window.location.reload());
    }

    function deleteCategory(id) {
        fetch(`/api/contents/c/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "DELETE",
        })
            .then(() => window.location.reload());
    }

    function createTag() {
        fetch(`/api/contents/create-t`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ tagName }),
            method: "POST",
        })
            .then(() => window.location.reload());
    }

    function createSerial() {
        fetch(`/api/contents/create-s`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ serialName }),
            method: "POST",
        })
            .then(() => window.location.reload());
    }

    function createCategory() {
        fetch(`/api/contents/create-c`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ genre: categoryName }),
            method: "POST",
        })
            .then(() => window.location.reload());
    }

    useEffect(() => {
        fetch("/api/contents", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
            .then((response) => {
                if (response.status === 200) return response.json();
            })
            .then((contentsData) => {
                setContents(contentsData);
            });
    }, []);

    return (
        <body>
            <Header />
            {contents && (
                <main className="contents-main">
                    <div className="table-container">
                        <div className="table-section">
                            <div>
                                <h3>Список тегів:</h3>
                                <div className="table-scroll">
                                    <table className="styled-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Назва</th>
                                                <th style={{textAlign:"center"}}>Дія</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contents.tags.map((tag) => (
                                                <tr key={tag.id}>
                                                    <td>{tag.id}</td>
                                                    <td>{tag.tagName}</td>
                                                    <td style={{display:"flex", justifyContent:"center"}}>
                                                        <button className="delete-btn" onClick={() => deleteTag(tag.id)}>Видалити</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="input-group">
                                <input placeholder="Назва тегу" value={tagName} onChange={(event) => setTagName(event.target.value)} />
                                <button className="add-btn" onClick={createTag}>Додати</button>
                            </div>
                        </div>
                        <div className="table-section">
                            <div>
                                <h3>Список серій:</h3>
                                <div className="table-scroll">
                                    <table className="styled-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Назва</th>
                                                <th style={{textAlign:"center"}}>Дія</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contents.serials.map((serial) => (
                                                <tr key={serial.id}>
                                                    <td>{serial.id}</td>
                                                    <td>{serial.serialName}</td>
                                                    <td style={{display:"flex", justifyContent:"center"}}>
                                                        <button className="delete-btn" onClick={() => deleteSerial(serial.id)}>Видалити</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="input-group">
                                <input placeholder="Назва серії" value={serialName} onChange={(event) => setSerialName(event.target.value)} />
                                <button className="add-btn" onClick={createSerial}>Додати</button>
                            </div>
                        </div>
                        <div className="table-section">
                            <div>
                                <h3>Список категорій:</h3>
                                <div className="table-scroll">
                                    <table className="styled-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Назва</th>
                                                <th style={{textAlign:"center"}}>Дія</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contents.categories.map((category) => (
                                                <tr key={category.id}>
                                                    <td>{category.id}</td>
                                                    <td>{category.genre}</td>
                                                    <td style={{display:"flex", justifyContent:"center"}}>
                                                        <button className="delete-btn" onClick={() => deleteCategory(category.id)}>Видалити</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="input-group">
                                <input placeholder="Назва категорії" value={categoryName} onChange={(event) => setCategoryName(event.target.value)} />
                                <button className="add-btn" onClick={createCategory}>Додати</button>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </body>
    );
};

export default Contents;
