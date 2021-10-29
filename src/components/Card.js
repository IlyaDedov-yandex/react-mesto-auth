import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like-btn ${isLiked && 'element__like-btn_active'}`;
    function handleClick() {
        onCardClick(card);
    }
    function handleLikClick() {
        onCardLike(card);
    }
    function handleDeleteClick() {
        onCardDelete(card);
    }
    return (
        <li className="element">
            <img onClick={handleClick} className="element__image" src={card.link} alt={card.name} />
            {isOwn && <button onClick={handleDeleteClick} type="button" className="element__delete-btn" aria-label="Удалить карточку"></button>}
            <div className="element__caption-container">
                <h2 className="element__caption">{card.name}</h2>
                <div>
                    <button onClick={handleLikClick} type="button" className={cardLikeButtonClassName} aria-label="Поставить лайк"></button>
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li >
    );
}

export default Card;