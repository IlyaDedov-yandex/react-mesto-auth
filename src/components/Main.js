import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="main">
            <section className="profile">
                <div className="profile__group">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                    <div className="profile__avatar-edit" onClick={onEditAvatar}></div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <p className="profile__subtitle">{currentUser.about}</p>
                    <button onClick={onEditProfile} type="button" className="profile__edit-button" aria-label="Изменить профайл"></button>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__add-button" aria-label="Добавить профайл"></button>

            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)}
                </ul>
            </section>
        </main>
    );
}

export default Main;