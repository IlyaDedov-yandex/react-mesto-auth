import React, { useState } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);
    function handleNameChange(e) {
        setName(e.target.value)
    }
    function handleDecriptionChange(e) {
        setDescription(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }
    return (
        <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <label className="form__field">
                <input type="text" name="profile-name" value={name} onChange={handleNameChange} placeholder="Имя" className="form__input form__input_type_name"
                    id="name-input" required minLength="2" maxLength="40" />
                <span className="form__input-error name-input-error"></span>
            </label>
            <label className="form__field">
                <input type="text" name="profile-about" value={description} onChange={handleDecriptionChange} placeholder="О себе"
                    className="form__input form__input_type_about" id="about-input" required minLength="2"
                    maxLength="200" />
                <span className="form__input-error about-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;