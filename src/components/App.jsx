import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import ItemModal from "./ItemModal";
import Footer from "./Footer";
import AddItemModal from "./AddItemModal";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";

import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { getWeather, filterWeatherData } from "../utils/WeatherApi";
import { coordinates, APIkey } from "../utils/constants";
import { getItems, postItems, deleteItems, getUserInfo } from "../utils/api";
import { signin, signup } from "../utils/auth";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState();
  const [currentUser, setCurrentUser] = useState({
    name: "Default User",
    avatar: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      getUserInfo(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(console.error)
    }
  }, [token]);

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
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return; 

    const handleEscClose = (e) => {  
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    
    document.addEventListener("keydown", handleEscClose);

    return () => {  
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); 

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => {
    setActiveModal("log-in");
  }

  const handleSignupClick = () => {
    setActiveModal("register");
  }

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const onSignup = ({ email, password, name, avatar }) => {
    console.log("api", email)
    signup({ email, password, name, avatar })
      .then((user) => {
        console.log(email);
        console.log(password);
        setCurrentUser(user);
        console.log(user);
        onSignin(email, password);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  }

  const onSignin = ({ email, password }) => {
    console.log(email, password)
    if (!email || !password) {
      console.log("oops")
      return;
    }
    signin(email, password)
      .then((res) => {
        console.log("hello")
        if (res.token) {
          localStorage.setItem("jwt", res.token);
        }
        closeActiveModal();
      })
      .catch(console.error)
  }

  const onAddItem = (data) => {
    postItems({ name: data.name, imageUrl: data.imageUrl, weather: data.weather }, token)
      .then((card) => {
        setClothingItems([card, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onDeleteItem = () => {
    deleteItems(selectedCard._id, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id !== selectedCard._id;
          })
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onEditProfile = () => {
    
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleSignin={handleLoginClick}
              handleSignup={handleSignupClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleAddClick={handleAddClick}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  </ProtectedRoute>
                }
              ></Route>
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
          <RegisterModal
            activeModal={activeModal}
            handleCloseClick={closeActiveModal}
            onSignup={onSignup}
          />
          <LoginModal
            activeModal={activeModal}
            handleCloseClick={closeActiveModal}
            onSignin={onSignin}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
