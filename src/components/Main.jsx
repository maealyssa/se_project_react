import { useContext } from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";

import "../blocks/Main.css";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { defaultClothingItems } from "../utils/constants";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherDataTemp = weatherData.temp?.[currentTemperatureUnit];
  return (
    <main>
      <WeatherCard
        weatherData={weatherData}
        weatherDataTemp={weatherDataTemp}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <section className="cards">
        <p className="cards__text">{`Today is ${weatherDataTemp} 
                °${currentTemperatureUnit} / You may want to wear:`}</p>
        <ul className="cards__list">
          {clothingItems &&
            clothingItems
              .filter((item) => {
                return item.weather === weatherData.type;
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={handleCardClick}
                  />
                );
              })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
