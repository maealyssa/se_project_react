import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";

import "../blocks/Main.css";
import { defaultClothingItems } from "../utils/constants";


function Main({ weatherData, handleCardClick }) {
    const weatherDataTemp = Math.floor(weatherData.temp.F)

    return (
        <main>
            <WeatherCard weatherData={weatherData} weatherDataTemp={weatherDataTemp} />
            <section className="cards">
                <p className="cards__text">Today is {weatherDataTemp} &deg; F / You may want to wear:</p>
                <ul className="cards__list">
                    {defaultClothingItems
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
    )
}

export default Main