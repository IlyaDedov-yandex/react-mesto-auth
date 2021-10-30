import React from "react";
function InfoTooltip({ isOpen, onClose, registerStatus }) {
    const { message, status } = registerStatus;
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button onClick={onClose} type="button" className="popup__close-btn" aria-label="Закрыть попап"></button>
                <div className={`popup__status-${status}`}></div>
                <p className="popup__caption">{message}</p>
            </div>
        </div >
    );
}

export default InfoTooltip;