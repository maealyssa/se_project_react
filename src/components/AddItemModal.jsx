import { useState } from "react";

import ModalWithForm from "./ModalWithForm";

function AddItemModal({ handleCloseClick, activeModal, onAddItem }) {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [weather, setWeather] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    
    const handleUrlChange = (e) => {
        setImageUrl(e.target.value)
    }

    const handleWeatherChange = (e) => {
        setWeather(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddItem(name, imageUrl, weather)
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
            <label htmlFor="imageUrl" className="modal__label">
                Image{""}
                <input 
                    type="url" 
                    name="url"
                    className="modal__input" 
                    id="imageUrl"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={handleUrlChange}
                />
            </label>
            <fieldset className="modal__fieldset">
                <legend className="modal__legend">Select the weather type</legend>
                <label htmlFor="hot" className="modal__label modal__label_type_radio">
                    <input 
                        value="hot"
                        id="hot" 
                        type="radio" 
                        name="weather-type" 
                        className="modal__radio-input"
                        checked={weather.toLowerCase() === "hot"}
                        onChange={handleWeatherChange} 
                    />
                    Hot
                </label>
                <label htmlFor="warm" className="modal__label modal__label_type_radio">
                    <input 
                        value="warm"
                        id="warm" 
                        type="radio" 
                        name="weather-type" 
                        className="modal__radio-input"
                        checked={weather.toLowerCase() === "warm"}
                        onChange={handleWeatherChange}
                    />
                    Warm
                </label>
                <label htmlFor="cold" className="modal__label modal__label_type_radio">
                    <input 
                        value="cold"
                        id="cold" 
                        type="radio" 
                        name="weather-type" 
                        className="modal__radio-input"
                        checked={weather.toLowerCase() === "cold"}
                        onChange={handleWeatherChange}
                    />
                    Cold
                </label>
            </fieldset>
        </ModalWithForm>
    )
}

export default AddItemModal;