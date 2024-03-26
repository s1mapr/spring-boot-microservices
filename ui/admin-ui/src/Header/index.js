import "./header.css"

const Header = () => {

function logout(){
        localStorage.clear();
        window.location.href="/login";
    }

    return (
        <>
        <nav className="navigation">
          <div className="navigation-container">
            <div className="navigation-collapse" id="navbarCollapse">
              <ul className="navigation-ul">
                <li className="navigation-item">
                  <a className="navigation-link" href="/titles/released">Опублікований контент</a>
                </li>
                <li className="navigation-item">
                  <a className="navigation-link" href="/titles/not-released">Неопублікований контент</a>
                </li>
                <li className="navigation-item">
                  <a className="navigation-link" href="/users/">Користувачі</a>
                </li>
              </ul>
    
              <ul className="navigation-ul">
                <li className="navigation-item">
                  <a className="navigation-link" href="/contents/">Теги/Серії/Категорії</a>
                </li>
                <li className="navigation-item">
                  <a className="navigation-link" href="/comments/">Коментарі</a>
                </li>
                <li className="navigation-item">
                  <a href="#" className="navigation-link" onClick={logout}>Вийти</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        </>
      );
}

export default Header;