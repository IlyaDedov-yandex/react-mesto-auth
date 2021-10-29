import React from 'react';

function ImagePopup({ card, onClose }) {

    return (
        <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
            <figure className="figure">
                <button onClick={onClose} type="button" className="popup__close-btn" aria-label="Закрыть попап"></button>
                <img className="figure__image" src={card ? card.link : ''}
                    alt={card ? card.name : ''} />
                <figcaption className="figure__caption">{card ? card.name : ''}</figcaption>
            </figure>
        </div >
    );
}

export default ImagePopup;