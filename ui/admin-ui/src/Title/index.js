import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import Header from "../Header";
import { useParams } from 'react-router-dom';
import "./title.css";

const Title = () => {
    const [title, setTitle] = useState(null);
    const [jwt, setJwt] = useLocalState("", "jwt");
    const { id } = useParams();
    const [showDropdownCategories, setShowDropdownCategories] = useState(false);
    const [showDropdownTags, setShowDropdownTags] = useState(false);
    const [showDropdownSeries, setShowDropdownSeries] = useState(false);

    function handleDropdownToggleSeries() {
        if (title && title.serials) {
        setShowDropdownSeries(!showDropdownSeries);
        }
    };

    function handleDropdownToggleTags() {
        if (title && title.tags) {
        setShowDropdownTags(!showDropdownTags);
        }
    };
    
    function handleDropdownToggleCategories(){
        if (title && title.categories) {
        setShowDropdownCategories(!showDropdownCategories);
        console.log(showDropdownCategories);
        }
    };

    function deleteComment(titleId, commentId) {
        fetch(`/api/titles/${titleId}/comment/${commentId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "DELETE",
        });
        window.location.reload();
    }

    function releaseOrBanTitle(titleId) {
        fetch(`/api/titles/${titleId}/release`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "POST",
        });
        window.location.reload();
    }

    useEffect(() => {

        fetch(`/api/titles/${{ id }.id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
            .then((response) => {
                if (response.status === 200) return response.json();
            })
            .then((titleData) => {
                setTitle(titleData);
                console.log("im here");
            });
    }, []);


    return (
        <body>
            <Header/>
            {title && (
                <main>
                    <div className="title-container">
                        <div className="title-div">
                        <div className="title-div-info">
                                <h3 className="title-info-h3">Інформація:</h3>
                                <div className="title-info-div">
                                    <div className="title-div-info-content">
                                        <label htmlFor="firstName" className="title-form-label">Назва</label>
                                        <input type="text" className="title-form-control" id="firstName"
                                               placeholder={title.titleName} disabled value="" required="" />
                                    </div>
                                    <div className="title-div-info-content">
                                        <label htmlFor="lastName" className="title-form-label">Оригінальний автор</label>
                                        <input type="text" className="title-form-control" id="lastName"
                                               placeholder={title.originalAuthor}
                                               disabled value="" required="" />
                                    </div>
                                    <div className="title-div-info-content">
                                        <label htmlFor="title-description" className="title-form-label">Опис публікації</label>
                                        <textarea htmlFor="title-description" style={{ height: '200px' }} className="w-100" disabled>
                                            {`${title.description}`}
                                        </textarea>
                                    </div>
                                    <div className="title-div-info-content">
                                        <div>
                                            <button className={`w-100 ${!title.released ? "btn-ban" : "btn-unban"}`} type="submit" onClick={()=>releaseOrBanTitle(title.id)}>
                                                {title.released ? "Заблокувати публікацію" : "Розблокувати публікацію для перегляду"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="title-div-order">
                                <div className="title-div-order-row">
                                <h3 className="title-comments-h3">Теги, категорії, серії:</h3>

                                    <div className="title-btn-group">
                                        {title.tags.length === 0 ? (
                                            <button type="button" className="w-100 title-dropdown-none" aria-expanded="false">
                                                Немає тегів
                                            </button>
                                        ) : (
                                            <button type="button" className="w-100 title-dropdown-btn" aria-expanded="false" onClick={()=>handleDropdownToggleTags()}>
                                                Список тегів
                                            </button>
                                        )}
                                        {showDropdownTags && (
                                        <ul className="title-dropdown-menu">
                                            {title.tags.map(tag => (
                                                <li key={tag.id} className="title-list-group-item" style={{ border: 'none' }}>
                                                    <span className="title-text-secondary">
                                                        <h6>{`Name: ${tag.tagName}`}</h6>
                                                    </span>
                                                    <span className="title-text-muted">{`ID: ${tag.id}`}</span>
                                                </li>
                                            ))}
                                        </ul>)}
                                    </div>
                                    <div className="title-btn-group">
                                        {title.categories.length === 0 ? (
                                            <button type="button" className="w-100 title-dropdown-none" aria-expanded="false">
                                                Немає категорій
                                            </button>
                                        ) : (
                                            <button type="button" className="w-100 title-dropdown-btn" aria-expanded="false" onClick={() => handleDropdownToggleCategories()}>
                                                Список категорій
                                            </button>
                                        )}
                                        {showDropdownCategories && (
                                        <ul className="title-dropdown-menu">
                                            {title.categories.map(category => (
                                                <li key={category.id} className="title-list-group-item" style={{ border: 'none' }}>
                                                    <span className="title-text-secondary">
                                                        <h6>{`Name: ${category.genre}`}</h6>
                                                    </span>
                                                    <span className="title-text-muted">{`ID: ${category.id}`}</span>
                                                </li>
                                            ))}
                                        </ul>)}
                                    </div>

                                    <div className="title-btn-group">
                                        {title.serials.length === 0 ? (
                                            <button type="button" className="w-100 title-dropdown-none" aria-expanded="false">
                                                Немає серій (поколінь, тощо)
                                            </button>
                                        ) : (
                                            <button type="button" className="w-100 title-dropdown-btn" aria-expanded="false" onClick={()=>handleDropdownToggleSeries()}>
                                                Список серій (поколінь, тощо)
                                            </button>
                                        )}
                                        {showDropdownSeries && (
                                        <ul className="title-dropdown-menu">
                                            {title.serials.map(serial => (
                                                <li key={serial.id} className="title-list-group-item" style={{ border: 'none' }}>
                                                    <span className="title-text-secondary">
                                                        <h6>{`Name: ${serial.serialName}`}</h6>
                                                    </span>
                                                    <span className="title-text-muted">{`ID: ${serial.id}`}</span>
                                                </li>
                                            ))}
                                        </ul>)}
                                    </div>
                            
                                    <div className="title-stats">
                                            <h3 className="title-comments-h3">Статистика публікації:</h3>

                                    <div className="title-stat">
                                        <input type="text" className="title-form-control" id="views"
                                            placeholder={`Переглядів: ${title.content.views}`} disabled required />
                                    </div>

                                    <div className="title-stat">
                                        <input type="text" className="title-form-control" id="comments"
                                            placeholder={`Коментарів: ${title.content.comments.length}`} disabled required />
                                    </div>

                                    <div className="title-stat">
                                        <input type="text" className="title-form-control" id="likes"
                                            placeholder={`Лайків: ${title.content.likesCount}`} disabled required />
                                    </div>
                                    </div>
                                    <div>
                                        <h3 className="title-comments-h3">Коментарі від користувачів:</h3>
                                        <ul className="title-comments-div">
                                            {title.content.comments.length > 0 ? (
                                                title.content.comments.map((comment, index) => (
                                                    <li key={index} className="title-list-group-item">
                                                        <a href={`/users/${comment.userID}`} style={{ textDecoration: 'none' }}>
                                                            <div>
                                                                <h6>{comment.creationDate ? new Date(comment.creationDate).toLocaleString() : "[date parse error]"}</h6>
                                                                <small>{`[${comment.user.name}]: ${comment.commentVal}`}</small>
                                                            </div>
                                                        </a>
                                                        <div>
                                                            <button style={{ textDecoration: 'none'}} className="title-comment-delete"
                                                            onClick={()=>deleteComment(title.id, comment.id)}
                                                            >видалити</button>
                                                        </div>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="title-list-group-item">
                                                    <div className="text-danger">
                                                        <h6 className="my-0">В публікації</h6>
                                                        <small>немає коментарів</small>
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </main>
            )}
        </body>
    );


}

export default Title;