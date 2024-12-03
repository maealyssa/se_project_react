import { useState } from "react";

import ModalWithForm from "./ModalWithForm";

function AddItemModal({ handleCloseClick, activeModal, onAddItem }) {
    const [data, setData] = useState({
      name: "",
      imageUrl: "",
      weather: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(name, imageUrl, weather);
  };

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
          value={data.name}
          onChange={handleChange}
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
          value={data.imageUrl}
          onChange={handleChange}
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
            checked={data.weather.toLowerCase() === "hot"}
            onChange={handleChange}
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
            checked={data.weather.toLowerCase() === "warm"}
            onChange={handleChange}
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
            checked={data.weather.toLowerCase() === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
