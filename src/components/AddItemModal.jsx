import { useState } from "react";

import ModalWithForm from "./ModalWithForm";

function AddItemModal({ handleCloseClick, activeModal, onAddItem }) {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    
    const handleUrlChange = (e) => {
        setUrl(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddItem({ name, url })
    }

    return (
        <ModalWithForm 
        title="New Garment" 
        buttonText="Add Garment"
        isOpen={activeModal === "add-garment" && "modal_opened"}
        handleCloseClick={handleCloseClick}
        onSubmit={handleSubmit}
        >
            <label htmlFor="name" className="modal__label">
                Name{""}
                <input 
                    type="text" 
                    name="name"
                    className="modal__input" 
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                />
            </label>
            <label htmlFor="imageURL" className="modal__label">
                Image{""}
                <input 
                    type="url" 
                    name="url"
                    className="modal__input" 
                    id="imageURL"
                    placeholder="Image URL"
                    value={url}
                    onChange={handleUrlChange}
                />
            </label>
            <fieldset className="modal__fieldset">
                <legend className="modal__legend">Select the weather type</legend>
                <label htmlFor="hot" className="modal__label modal__label_type_radio">
                    <input id="hot" type="radio" name="weather-type" className="modal__radio-input" />
                    Hot
                </label>
                <label htmlFor="warm" className="modal__label modal__label_type_radio">
                    <input id="warm" type="radio" name="weather-type" className="modal__radio-input" />
                    Warm
                </label>
                <label htmlFor="cold" className="modal__label modal__label_type_radio">
                    <input id="cold" type="radio" name="weather-type" className="modal__radio-input" />
                    Cold
                </label>
            </fieldset>
        </ModalWithForm>
    )
}

export default AddItemModal;