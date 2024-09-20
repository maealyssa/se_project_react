import { useEffect, useState } from "react";

import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import Footer from "./Footer";
import {CurrentTemperatureUnitContext} from "./CurrentTemperatureUnitContext";
import { getWeather, filterWeatherData } from "../utils/WeatherApi";
import { coordinates, APIkey } from "../utils/constants";

function App() {
    const [weatherData, setWeatherData] = useState({
        type: "", 
        temp: { F: 999, C: 999 },
        city: "",
    });
    const [activeModal, setActiveModal] = useState("");
    const [selectedCard, setSelectedCard] = useState({});
    const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

    const handleCardClick = (card) => {
        setActiveModal("preview");
        setSelectedCard(card);
    }

    const handleAddClick = () => {
        setActiveModal("add-garment");
    }

    const closeActiveModal = () => {
        setActiveModal("");
    }

    const handleToggleSwitchChange = () => {
        if(currentTemperatureUnit === 'F') {
            setCurrentTemperatureUnit('C')
        } else if(currentTemperatureUnit === 'C') {
            setCurrentTemperatureUnit('F')
        }
    }

    useEffect(() => {
        getWeather(coordinates, APIkey)
            .then((data) => {
                const filteredData = filterWeatherData(data);
                setWeatherData(filteredData);
            })
            .catch(console.error);
    }, []);

    return (
    <div className="page">
        <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
        <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <Main weatherData={weatherData} handleCardClick={handleCardClick} />
            <Footer />
        </div>
        <ModalWithForm 
            title="New Garment" 
            buttonText="Add Garment"
            isOpen={activeModal === "add-garment" && "modal_opened"}
            handleCloseClick={closeActiveModal}
        >
            <label htmlFor="name" className="modal__label">
                Name{""}
                <input 
                    type="text" 
                    className="modal__input" 
                    id="name"
                    placeholder="Name"
                />
            </label>
            <label htmlFor="imageURL" className="modal__label">
                Image{""}
                <input 
                    type="url" 
                    className="modal__input" 
                    id="imageURL"
                    placeholder="Image URL"
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
        <ItemModal 
            activeModal={activeModal}
            handleCloseClick={closeActiveModal}
            card={selectedCard}
        />
        </CurrentTemperatureUnitContext.Provider>
    </div>
    )
}

export default App