import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import Header from "../Header";
import { useLocation } from 'react-router-dom';
import "./titles.css";

const Titles = () => {
  const [titles, setTitles] = useState(null);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [filter, setFilter] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(window.location.search);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false); // Добавляем состояние для открытия/закрытия выпадающего списка сортировки


  const handleSearch = () => {
    const url = `/titles?filter=${encodeURIComponent(filter)}`;
    window.location.href = url;
  }

  const handleSort = (sortValue) => {
    window.location.href = `/titles?sort=${sortValue}`;
  };

  const toggleSortDropdown = () => {
    setSortDropdownOpen(!sortDropdownOpen);
  }

  useEffect(() => {
    let url = `/api/titles/released`;

    if (location.pathname.includes("not-released")) {
      url = `/api/titles/not-released`;
    } else if (location.pathname.includes("released")) {
      url = `/api/titles/released`;
    } else if (params.has("filter")) {
      const filterValue = params.get('filter');
      url = `/api/titles/f?filter=${filterValue}`;
    } else if (params.has('sort')) {
      const sortValue = params.get('sort');
      if (sortValue === 'id') {
        url = `/api/titles/sort/id`;
      } else if (sortValue === 'date') {
        url = `/api/titles/sort/date`;
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
      .then((titlesData) => {
        setTitles(titlesData);
      });
  }, []);

  return (
    <>
      <Header />
      <main className="titles-main">
        <div className="titles-container">
          <div className="titles-search">
            <div className="titles-input-group">
              <input
                className="titles-form-control"
                type="search"
                placeholder="Пошук по головній назві"
                aria-label="Search"
                id="filter"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              />
              <button
                className="titles-btn"
                type="button"
                onClick={handleSearch}
              >
                Пошук
              </button>
            </div>
          </div>
          <div className="titles-sort">
            <div className="titles-dropdown">
              <button
                className="titles-btn"
                type="button"
                onClick={toggleSortDropdown}
              >
                Сортувати за
              </button>
              {sortDropdownOpen && (
                <ul className="titles-dropdown-menu">
                  <li>
                    <button
                      className="titles-dropdown-item"
                      type="button"
                      onClick={() => handleSort('id')}
                    >
                      Ідентифікатором
                    </button>
                  </li>
                  <li>
                    <button
                      className="titles-dropdown-item"
                      type="button"
                      onClick={() => handleSort('date')}
                    >
                      Датою створення
                    </button>
                  </li>
                </ul>
              )}
            </div>
            <a className="titles-reset-btn" href="/titles/">Скинути</a>
          </div>
          <div className="titles-table">
            <div className="titles-table-responsive">
              <table className="titles-table-custom">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Назва</th>
                    <th scope="col">Опис</th>
                    <th scope="col" width="150">Дата</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Тип</th>
                    <th scope="col">Теги</th>
                    <th scope="col">Категорії</th>
                    <th scope="col">Серії</th>
                  </tr>
                </thead>
                <tbody>
                  {titles && titles.length > 0 ? (
                    titles.map((title) => (
                      <tr key={title.id}>
                        <td>
                          <a className="titles-href-id" href={'/titles/' + title.id}>{title.id}</a>
                        </td>
                        <td>
                          <span>{title.titleName}</span>
                        </td>
                        <td>
                          <span>{title.description}</span>
                        </td>
                        <td>
                          <span>{new Date(title.creationDate).toLocaleString()}</span>
                        </td>
                        <td>
                          {title.released ? 'Випущена' : 'Заблокована'}
                        </td>
                        <td>
                          <span>{title.type === '' ? title.type : 'Тип не вказано'}</span>
                        </td>
                        <td>
                          {title.tags.map((tag, index) => (
                            <small key={index} className="titles-d-block">{tag.tagName}</small>
                          ))}
                        </td>
                        <td>
                          {title.categories.map((cat, index) => (
                            <small key={index} className="titles-d-block">{cat.genre}</small>
                          ))}
                        </td>
                        <td>
                          {title.serials.map((ser, index) => (
                            <small key={index} className="titles-d-block">{ser.serialName}</small>
                          ))}
                        </td>


                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10">Ще немає публікацій</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Titles;
