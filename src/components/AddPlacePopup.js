import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);
    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleLinkChange(e) {
        setLink(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        });
    }
    return (
        <PopupWithForm name="new-card" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <label className="form__field">
                <input type="text" name="card-name" value={name} onChange={handleNameChange} placeholder="Название" className="form__input form__input_type_name"
                    id="card-name-input" required minLength="2" maxLength="30" />
                <span className="form__input-error card-name-input-error"></span>
            </label>
            <label className="form__field">
                <input type="url" name="card-link" value={link} onChange={handleLinkChange} placeholder="Ссылка на картинку"
                    className="form__input form__input_type_about" id="card-link-input" required />
                <span className="form__input-error card-link-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;