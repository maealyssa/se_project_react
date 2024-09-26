import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import ItemModal from "./ItemModal";
import Footer from "./Footer";
import AddItemModal from "./AddItemModal";
import Profile from "./Profile";

import {CurrentTemperatureUnitContext} from "../utils/CurrentTemperatureUnitContext";
import { getWeather, filterWeatherData } from "../utils/WeatherApi";
import { coordinates, APIkey } from "../utils/constants";
import { getItems, postItems, deleteItems } from "../utils/api";


function App() {
    const [weatherData, setWeatherData] = useState({
        type: "", 
        temp: { F: 999, C: 999},
        city: "",
    });
    const [activeModal, setActiveModal] = useState("");
    const [selectedCard, setSelectedCard] = useState({});
    const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
    const [clothingItems, setClothingItems] = useState();

    useEffect(() => {
        getWeather(coordinates, APIkey)
            .then((data) => {
                const filteredData = filterWeatherData(data);
                setWeatherData(filteredData);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        getItems()
            .then((data) => {
                setClothingItems(data);
            }).catch(console.error);
    }, []);

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
        currentTemperatureUnit === 'F'
          ? setCurrentTemperatureUnit('C')
          : setCurrentTemperatureUnit('F');
    };

    const onAddItem = (name, imageUrl, weather) => {
        postItems({ name: name, imageUrl: imageUrl, weather: weather })
            .then((card) => {
                setClothingItems((clothingItems) => [card, ...clothingItems]);
                closeActiveModal();
            }).catch(console.error);
    }

    const onDeleteItem = () => {
        deleteItems(selectedCard._id)
            .then(() => {
                setClothingItems(
                    clothingItems.filter((item) => {
                        return item._id !== selectedCard._id;
                    })
                )
                closeActiveModal();
            }).catch(console.error);
    }

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
                    path="/se_project_react/" 
                    element={
                        <Main 
                            weatherData={weatherData} 
                            handleCardClick={handleCardClick} 
                            clothingItems={clothingItems}
                        />
                }></Route>
                <Route 
                    path="/se_project_react/profile" 
                    element={
                        <Profile 
                            handleAddClick={handleAddClick} 
                            handleCardClick={handleCardClick}
                            clothingItems={clothingItems}
                        />
                    }>
                </Route>
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
            handleDeleteCard={onDeleteItem}
        />
        </CurrentTemperatureUnitContext.Provider>
    </div>
    )
}

export default App