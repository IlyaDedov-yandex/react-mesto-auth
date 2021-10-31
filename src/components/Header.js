import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ userEmail, handleSignOut }) {
    const location = useLocation();
    function signOut() {
        handleSignOut();
    }
    function renderSwitch(param) {
        switch (param) {
            case '/sign-up':
                return (<Link to="/sign-in" className="header__link">Войти</Link>);
            case '/sign-in':
                return (<Link to="/sign-up" className="header__link">Регистрация</Link>);
            default:
                return (<Link to="/sign-in" onClick={signOut} className="header__link">Выйти</Link>);
        }
    }
    return (
        <header className="header">
            <a className="header__logo" href="https://ilyadedov-yandex.github.io/mesto-react/" target="_self" rel="noopener noreferrer"></a>
            <div className="header__container">
                {userEmail && <p className="header__email">{userEmail}</p>}
                {renderSwitch(location.pathname)}
            </div>
        </header>
    );
}

export default Header;