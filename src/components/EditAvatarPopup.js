import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const urlRef = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(urlRef.current.value);
    }

    return (
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <label className="form__field">
                <input type="url" ref={urlRef} name="avatar-link" placeholder="ссылка на аватар"
                    className="form__input form__input_type_link" id="avatar-link-input" required />
                <span className="form__input-error avatar-link-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;