import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import ItemModal from "./ItemModal";
import Footer from "./Footer";
import {CurrentTemperatureUnitContext} from "./CurrentTemperatureUnitContext";
import { getWeather, filterWeatherData } from "../utils/WeatherApi";
import { coordinates, APIkey } from "../utils/constants";
import AddItemModal from "./AddItemModal";

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

    const onAddItem = (values) => {
        console.log(values);
    }

    const handleToggleSwitchChange = () => {
        currentTemperatureUnit === 'F'
          ? setCurrentTemperatureUnit('C')
          : setCurrentTemperatureUnit('F');
    };

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
            <Header 
                handleAddClick={handleAddClick} 
                weatherData={weatherData}
            />
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <Main 
                            weatherData={weatherData} 
                            handleCardClick={handleCardClick} 
                        />
                }></Route>
                <Route path="/profile" element={<p>PROFILE</p>}></Route>
            </Routes>
            <Footer />
        </div>
        <AddItemModal
            activeModal={activeModal}
            handleCloseClick={closeActiveModal}
            onAddItem={onAddItem}
        />
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